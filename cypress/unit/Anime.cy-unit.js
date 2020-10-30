import { mount } from 'cypress-react-unit-test'

it('hello world', () => {
  mount(<p>Hello Jest!</p>)
  cy.findByText('Hello Jest!')
})
