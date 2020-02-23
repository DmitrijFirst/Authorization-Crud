import { ThousandPipe } from './num.pipe';

describe('NumPipe', () => {
  it('create an instance', () => {
    const pipe = new ThousandPipe();
    expect(pipe).toBeTruthy();
  });
});