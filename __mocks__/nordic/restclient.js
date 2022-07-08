const mockGet = jest.fn()
const mockRestClient = jest.fn().mockImplementation(() => ({
    get: mockGet
}))

module.exports = mockRestClient;
module.exports.mockGet = mockGet ;