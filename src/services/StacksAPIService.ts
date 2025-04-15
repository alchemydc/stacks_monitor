import axios from 'axios';

const API_ENDPOINT = "https://api.hiro.so";

interface PoxResponse {
  contract_id: string;
  pox_activation_threshold_ustx: number;
  first_burnchain_block_height: number;
  current_burnchain_block_height: number;
  prepare_phase_block_length: number;
  reward_phase_block_length: number;
  reward_slots: number;
  rejection_fraction: null | number;
  total_liquid_supply_ustx: number;
  current_cycle: {
    id: number;
    min_threshold_ustx: number;
    stacked_ustx: number;
    is_pox_active: boolean;
  };
  next_cycle: {
    id: number;
    min_threshold_ustx: number;
    min_increment_ustx: number;
    stacked_ustx: number;
    prepare_phase_start_block_height: number;
    blocks_until_prepare_phase: number;
    reward_phase_start_block_height: number;
    blocks_until_reward_phase: number;
    ustx_until_pox_rejection: null | number;
  };
  epochs: any[];
  min_amount_ustx: number;
  prepare_cycle_length: number;
  reward_cycle_id: number;
  reward_cycle_length: number;
  rejection_votes_left_required: null | number;
  next_reward_cycle_in: number;
  contract_versions: any[];
}

async function fetchPoxData(): Promise<PoxResponse> {
  try {
    const response = await axios.get<PoxResponse>(`${API_ENDPOINT}/v2/pox`);
    if (process.env.NODE_ENV === 'development') {
      console.log("Stacks API Response:", response.data);
    }
    return response.data;
  } catch (error: any) {
    console.error("Error fetching POX data:", error);
    throw error;
  }
}


interface Signer {
  signer_key: string;
  slot_index: number;
  weight: number;
  weight_percentage: number;
  stacked_amount: string;
  stacked_amount_percent: number;
  stacked_amount_rank: number;
  proposals_accepted_count: number;
  proposals_rejected_count: number;
  proposals_missed_count: number;
  average_response_time_ms: number;
  last_seen: string;
  version: string;
}

interface CycleSigner {
  total: number;
  limit: number;
  offset: number;
  results: Signer[];
}

async function fetchSignersForCurrentCycle(): Promise<CycleSigner> {
  try {
    const poxData = await fetchPoxData();
    const currentCycleId = poxData.current_cycle.id;
    const url = `${API_ENDPOINT}/signer-metrics/v1/cycles/${currentCycleId}/signers`;
    // log url if in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log("Fetching signers from URL:", url);
    }
    const response = await axios.get<CycleSigner>(url);
    if (process.env.NODE_ENV === 'development') {
      console.log("Signers API Response:", response.data);
    }
    return response.data;
  } catch (error: any) {
    console.error("Error fetching signers:", error);
    throw error;
  }
}

async function fetchSigners(): Promise<string[]> {
  try {
    const cycleSignerData = await fetchSignersForCurrentCycle();
    if (cycleSignerData && cycleSignerData.results) {
      return cycleSignerData.results.map((signer) => signer.signer_key);
    } else {
      console.warn("Signers API returned no results");
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching signers:", error);
    return [];
  }
}

interface SignerMetrics {
  signer_key: string;
  slot_index: number;
  weight: number;
  weight_percentage: number;
  stacked_amount: string;
  stacked_amount_percent: number;
  stacked_amount_rank: number;
  proposals_accepted_count: number;
  proposals_rejected_count: number;
  proposals_missed_count: number;
  average_response_time_ms: number;
  last_seen: string;
  version: string;
}

async function fetchSignerMetrics(signerId: string): Promise<SignerMetrics | null> {
  try {
    const poxData = await fetchPoxData();
    const currentCycleId = poxData.current_cycle.id;
    const url = `${API_ENDPOINT}/signer-metrics/v1/cycles/${currentCycleId}/signers/${signerId}`;
    if (process.env.NODE_ENV === 'development') {
      console.log("Fetching signer metrics from URL:", url);
    }
    const response = await axios.get<SignerMetrics>(url);
    if (process.env.NODE_ENV === 'development') {
      console.log("Signer Metrics API Response:", response.data);
    }
    return response.data;
  } catch (error: any) {
    console.error("Error fetching signer metrics:", error);
    return null;
  }
}

export { fetchPoxData, fetchSignersForCurrentCycle, fetchSigners, fetchSignerMetrics };
export type { Signer };
