import jobs from '../jobs';

describe("Search And Filter Jobs", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(() => res),
            end: jest.fn(),
            json: jest.fn(resObj => ({
                status: jest.fn(status => ({ res: { ...resObj, statusCode: status } 
              })),
            })),
        };
    });

    it("Should return 405 if the method is not POST", async () => {
        req.method = 'GET';
        const response = await jobs(req, res)

        expect(res.status).toBeCalledWith(405)
        expect(res.end).toHaveBeenCalledTimes(1)
        // fail("Not Implemented")
    });

    it("Should return 200 if the method is POST", async () => {
        req.method = 'POST';
        const response = await jobs(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toHaveBeenCalledTimes(1)
    });
});