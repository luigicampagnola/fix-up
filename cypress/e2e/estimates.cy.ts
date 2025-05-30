describe('Estimate Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/estimates');
  });

  // Valid Cases
  it('Passes with valid phone number and space-separated address', () => {
    cy.get('#fullName').type('John Smith');
    cy.get('#phoneNumber').type('(954) 123-4567');
    cy.get('#email').type('john.smith@example.com');
    cy.get('#street').type('6917 NW 77th Ave Miami 33166');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#general-error').should('not.exist');
    cy.get('#error-phoneNumber').should('not.exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with valid phone number and comma-separated address with special characters', () => {
    cy.get('#fullName').type('Jane Doe');
    cy.get('#phoneNumber').type('(954) 987-6543');
    cy.get('#email').type('jane.doe@example.com');
    cy.get('#street').type('123 N.E. 1st St., Miami, 33132');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with custom area code and "Yes" clicked', () => {
    cy.get('#fullName').type('Alice Brown');
    cy.get('#phoneNumber').type('(123) 456-7890');
    cy.get('#email').type('alice.brown@example.com');
    cy.get('#street').type('456 SW 2nd Ave Miami 33130');
    cy.get('#custom-area-code-yes').should('exist').click();
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-phoneNumber').should('not.exist');
  });

  // Falsy Cases
  it('Fails with custom area code when "No" clicked', () => {
    cy.get('#fullName').type('Bob Wilson');
    cy.get('#phoneNumber').type('(123) 456-7890');
    cy.get('#email').type('bob.wilson@example.com');
    cy.get('#street').type('789 NW 3rd St Miami 33128');
    cy.get('#custom-area-code-no').should('exist').click();
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-phoneNumber').should('contain', 'Invalid US phone number');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with phone number too short', () => {
    cy.get('#fullName').type('John Smith');
    cy.get('#phoneNumber').type('(954) 123-456');
    cy.get('#email').type('john.smith@example.com');
    cy.get('#street').type('6917 NW 77th Ave Miami 33166');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-phoneNumber').should('contain', 'Phone number must be in format (000) 000-0000');
    cy.get('#thank-you-description').should('not.exist');
  });


  it('Fails with invalid address (non-South Florida city)', () => {
    cy.get('#fullName').type('John Smith');
    cy.get('#phoneNumber').type('(954) 123-4567');
    cy.get('#email').type('john.smith@example.com');
    cy.get('#street').type('123 Main St Orlando 32801');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), and valid ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid address (invalid ZIP)', () => {
    cy.get('#fullName').type('Jane Doe');
    cy.get('#phoneNumber').type('(954) 987-6543');
    cy.get('#email').type('jane.doe@example.com');
    cy.get('#street').type('1234 SW 1st St Miami 33400'); // zip code is bigger than the available range
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), and valid ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with address too long', () => {
    cy.get('#fullName').type('Alice Brown');
    cy.get('#phoneNumber').type('(954) 456-7890');
    cy.get('#email').type('alice.brown@example.com');
    cy.get('#street').type('1234567890 1234567890 NW 1234567890 Street Suite 23456, Miami, FL 33166-7890, United States');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address cannot exceed 90 characters');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid address format (no city)', () => {
    cy.get('#fullName').type('Bob Wilson');
    cy.get('#phoneNumber').type('(954) 123-4567');
    cy.get('#email').type('bob.wilson@example.com');
    cy.get('#street').type('1234 SW 1st St 33130');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), and valid ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });
});