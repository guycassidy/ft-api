
jest.mock('../src/repo')

describe('getAll', () => {
  let wrapper;

  beforeAll(async () => {
    wrapper = await LambdaWrapper.getWrapper('all');
  });

  it('returns 200', async () => {
    const event = {};
    const response = await wrapper.run(event);
    console.log(response)
    expect(response.statusCode).toBe(200)
  });

})