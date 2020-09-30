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

      it("OData supports POST", async () => {
        const { data: prod1 } = await POST('/admin/Products', { ID: 107, name: "SAP Business Application Studio" });
        expect(p1).to.contain({ ID: 107,name:"Apple TV",description:"Apple 64GB, 4th Generation",stock:1000,price:200,currency_code:EUR,manufacturer_ID:"17e56c6c-ff15-4a41-b68e-1af2aa2639a5"});
      });

      it("OData supports $expand", async () => {
        const { data } = await GET(`/admin/Products`, {
          params: {
            $filter: `ID eq 101`,
            $select: `name,stock`,
            $expand: `manufacturer($select=name)`,
          },
        });
        expect(data.value).to.eql([
          {
            ID: 101,
            title: "iPad",
            stock: "1000",
            reviews: [
              { id: "17e56c6c-ff15-4a41-b68e-1af2aa2639a5", name: "Apple" }            
            ],
          },          
        ]);
      });
    })