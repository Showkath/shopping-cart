const { GET, POST, PATCH, DEL, expect } = require("./cds").test(".").in(__dirname, "..");

describe('OData Protocol', () => {
    it('serves $metadata documents in v4', async () => {
        const { headers, status, data } = await GET`/admin/$metadata`
        expect(status).to.equal(200)
        expect(headers).to.contain({
          'content-type': 'application/xml',
          'odata-version': '4.0',
        })
        expect(data).to.contain('<EnctitySet Name="Products" EntityType="AdminService.Products">')
        expect(data).to.contain('<Annotation Term="Common.Label" String="Currency"/>')
      });      
    })