import { fetchPoxData, fetchSignersForCurrentCycle, Signer } from './StacksAPIService';

describe('StacksAPIService', () => {
  it('should fetch pox data', async () => {
    const poxData = await fetchPoxData();
    expect(poxData).toBeDefined();
    expect(typeof poxData).toBe('object');
    expect(poxData.current_cycle).toBeDefined();
    expect(typeof poxData.current_cycle.id).toBe('number');
    if (process.env.NODE_ENV === 'development') {
      console.log(`Stacks API Response: current_cycle.id ${poxData.current_cycle.id}`);
    }
  });

  it('should fetch signers for the current cycle', async () => {
    const signers = await fetchSignersForCurrentCycle();
    expect(signers).toBeDefined();
    expect(typeof signers).toBe('object');
    expect(signers.results).toBeDefined();
    expect(Array.isArray(signers.results)).toBe(true);
    if (signers.total > 0) {
      expect(signers.results.length).toBeGreaterThan(0);
      signers.results.forEach((signer: Signer) => {
        expect(signer.signer_key).toBeDefined();
        expect(typeof signer.signer_key).toBe('string');
      });
    }
  });
});
