let petId = 1107;
let petName = 'Sharo'

describe('Test API in https://petstore.swagger.io/', () => {
  it('should return 200 when create a Pet', () => {
      cy.request({
        method: 'POST', 
        url: '/pet',
        body: {
          id: petId,
          name: petName,
          status: "available"
        }
      }).then( ({ status }) => {
        expect(status).to.eq(200)
      })
    });
  it('should return 200 when a valid petId is entered', () => {
    cy.request('GET', `/pet/${petId}`).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body)
      expect(response.body.name).to.eq(petName)
    });
  });

  it('should return 200 when update the information of the pet', () => {
    cy.request({
      method: 'PUT', 
      url: '/pet',
      body: {
        id: petId,
        name: "Luca",
        status: "sold"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body)
      expect(response.body.name).to.eq("Luca")
    })
  });

  it('should pet by status sold', () => {
    cy.request('GET', '/pet/findByStatus?status=sold').then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body);
    });
  });

  it('should return 404 when the petId is invalid', () => {
    cy.request({
      method: 'GET',
      url: `/pet/8089098`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
})