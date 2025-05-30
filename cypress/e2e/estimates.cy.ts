describe('Estimate Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/estimates');
  });

  // Valid Cases
  it('Passes with valid phone number and space-separated address', () => {
    cy.get('#fullName').type('John Smith');
    cy.get('#phoneNumber').type('(954) 123-4567');
    cy.get('#email').type('john.smith@gmail.com');
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
    cy.get('#email').type('jane.doe@gmail.com');
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
    cy.get('#email').type('alice.brown@gmail.com');
    cy.get('#street').type('456 SW 2nd Ave Miami 33130');
    cy.get('#custom-area-code-yes').should('exist').click();
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-phoneNumber').should('not.exist');
  });

  it('Passes with address including state abbreviation FL', () => {
    cy.get('#fullName').type('Robert Johnson');
    cy.get('#phoneNumber').type('(954) 555-1234');
    cy.get('#email').type('robert.johnson@gmail.com');
    cy.get('#street').type('789 NE 5th St, Fort Lauderdale, 33301, FL');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with address including full state name Florida', () => {
    cy.get('#fullName').type('Emily Davis');
    cy.get('#phoneNumber').type('(954) 555-6789');
    cy.get('#email').type('emily.davis@gmail.com');
    cy.get('#street').type('101 SW 10th Ave Miami 33130 Florida');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with address including country USA', () => {
    cy.get('#fullName').type('Michael Chen');
    cy.get('#phoneNumber').type('(954) 555-9876');
    cy.get('#email').type('michael.chen@gmail.com');
    cy.get('#street').type('321 NW 12th St, Coral Gables, 33134, USA');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with address including state FL and country United States', () => {
    cy.get('#fullName').type('Lisa Wong');
    cy.get('#phoneNumber').type('(954) 555-5432');
    cy.get('#email').type('lisa.wong@gmail.com');
    cy.get('#street').type('654 SE 3rd Ave, Miami, 33131, FL, United States');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with address including # in street', () => {
    cy.get('#fullName').type('Tom Harris');
    cy.get('#phoneNumber').type('(954) 555-3210');
    cy.get('#email').type('tom.harris@gmail.com');
    cy.get('#street').type('123 #B NW 7th St, Miami, 33132, FL');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with address including 5-digit street number', () => {
    cy.get('#fullName').type('Sarah Lee');
    cy.get('#phoneNumber').type('(954) 555-4321');
    cy.get('#email').type('sarah.lee@gmail.com');
    cy.get('#street').type('11399 S Dixie Hwy, Miami, 33156, FL, United States');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with 1-digit street number', () => {
    cy.get('#fullName').type('Anna Smith');
    cy.get('#phoneNumber').type('(954) 555-2345');
    cy.get('#email').type('anna.smith@gmail.com');
    cy.get('#street').type('7 NW 8th St, Miami, 33130, FL');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  it('Passes with 5-digit street number', () => {
    cy.get('#fullName').type('Mark Brown');
    cy.get('#phoneNumber').type('(954) 555-6789');
    cy.get('#email').type('mark.brown@gmail.com');
    cy.get('#street').type('12345 SW 9th St, Miami, 33131, USA');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#thank-you-description', { timeout: 10000 }).should('exist');
    cy.get('#error-street').should('not.exist');
  });

  // Falsy Cases
  it('Fails with custom area code when "No" clicked', () => {
    cy.get('#fullName').type('Bob Wilson');
    cy.get('#phoneNumber').type('(123) 456-7890');
    cy.get('#email').type('bob.wilson@gmail.com');
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
    cy.get('#email').type('john.smith@gmail.com');
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
    cy.get('#email').type('john.smith@gmail.com');
    cy.get('#street').type('123 Main St Orlando 33166');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Unfortunately, we do not currently serve that city. Please call us at (786) 235-2435 for more information.');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid address (invalid ZIP)', () => {
    cy.get('#fullName').type('Jane Doe');
    cy.get('#phoneNumber').type('(954) 987-6543');
    cy.get('#email').type('jane.doe@gmail.com');
    cy.get('#street').type('1234 SW 1st St Miami 33400');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires a valid ZIP code in South Florida');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with address too long', () => {
    cy.get('#fullName').type('Alice Brown');
    cy.get('#phoneNumber').type('(954) 456-7890');
    cy.get('#email').type('alice.brown@gmail.com');
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
    cy.get('#email').type('bob.wilson@gmail.com');
    cy.get('#street').type('1234 SW 1st St 33130');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Unfortunately, we do not currently serve that city. Please call us at (786) 235-2435 for more information.');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid state abbreviation (not FL)', () => {
    cy.get('#fullName').type('Sarah Lee');
    cy.get('#phoneNumber').type('(954) 555-4321');
    cy.get('#email').type('sarah.lee@gmail.com');
    cy.get('#street').type('456 NE 8th St, Miami, 33132, NY');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid state name (not Florida)', () => {
    cy.get('#fullName').type('David Kim');
    cy.get('#phoneNumber').type('(954) 555-8765');
    cy.get('#email').type('david.kim@gmail.com');
    cy.get('#street').type('789 Main St, Miami, 33132, California');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid country (not USA/United States)', () => {
    cy.get('#fullName').type('Anna Smith');
    cy.get('#phoneNumber').type('(954) 555-2345');
    cy.get('#email').type('anna.smith@gmail.com');
    cy.get('#street').type('123 SE 7th St, Miami, 33131, FL, Canada');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with invalid address (non-South Florida city with FL and USA)', () => {
    cy.get('#fullName').type('David Kim');
    cy.get('#phoneNumber').type('(954) 555-8765');
    cy.get('#email').type('david.kim@gmail.com');
    cy.get('#street').type('789 Main St, Orlando, 33131, FL, USA');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Unfortunately, we do not currently serve that city. Please call us at (786) 235-2435 for more information.');
    cy.get('#thank-you-description').should('not.exist');
  });

  it('Fails with 7-digit street number', () => {
    cy.get('#fullName').type('Mark Brown');
    cy.get('#phoneNumber').type('(954) 555-6789');
    cy.get('#email').type('mark.brown@gmail.com');
    cy.get('#street').type('1234567 SW 9th St, Miami, 33131, USA');
    cy.get('input[name="contactInfo"]').should('have.value', '');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.get('#error-street').should('contain', 'Address requires street, city (Broward/Miami-Dade), ZIP code');
    cy.get('#thank-you-description').should('not.exist');
  });
});