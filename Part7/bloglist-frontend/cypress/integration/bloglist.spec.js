describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Prince Whyte Dabotubo',
      username: 'Princewhyte2',
      password: 'Admin@123',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('Princewhyte2');
      cy.get('#password').type('Admin@123');
      cy.contains('login').click();

      cy.contains('Prince Whyte Dabotubo logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('Princewhyte02');
      cy.get('#password').type('Admin@1293');
      cy.contains('login').click();

      cy.contains('Wrong username or password');
    });
  });
  describe('When logged in', () => {
    beforeEach(() => {
      // log in user here
      cy.get('#username').type('Princewhyte2');
      cy.get('#password').type('Admin@123');
      cy.contains('login').click();
    });

    it('A blog can be created', () => {
      cy.contains('create new blog').click();
      cy.get('#title').type('Test blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.test.com');
      cy.get('#submitBtn').click();
      cy.contains('Test blog');
    });

    it('A user can like a blog', () => {
      cy.contains('create new blog').click();
      cy.get('#title').type('Test blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.test.com');
      cy.get('#submitBtn').click();
      cy.contains('Test blog');
      cy.contains('show').click();
      cy.contains('like').click();
      cy.contains('show').click();
      cy.contains('1');
    });

    it('A user can delete his/her own blog', () => {
      cy.contains('create new blog').click();
      cy.get('#title').type('Test blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.test.com');
      cy.get('#submitBtn').click();
      cy.contains('Test blog');
      cy.contains('show').click();
      cy.contains('remove').click();
      cy.contains('Test blog').should('not.exist');
    });

    it('blogs are ordered according to likes', () => {
      cy.contains('create new blog').click();
      cy.get('#title').type('Test blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.test.com');
      cy.get('#submitBtn').click();
      cy.contains('Test blog');
      cy.contains('show').click();
      cy.contains('like').click();
      cy.contains('show').click();
      cy.contains('create new blog').click();
      cy.get('#title').type('Test blog2');
      cy.get('#author').type('Test author2');
      cy.get('#url').type('www.test2.com');
      cy.get('#submitBtn').click();
      cy.contains('Test blog2');
      cy.contains('show').click();
      cy.contains('like').click();
      cy.contains('show').click();
      cy.get('.blog').then((blog) => {
        cy.wrap(blog[0]).contains('likes 2');
        cy.wrap(blog[1]).contains('likes 1');
        // cy.wrap(blog[2]).contains('likes: 0');
      });
    });
  });
});
