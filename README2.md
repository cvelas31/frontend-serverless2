# How to do
- Definir componentes (Inputs outputs)
- Pensar que lo puede usar un celular
  - Llamarla y almacenarla localmente.
  - Props (Argumentos de cualquier func)
  - Llamas la API y la guardamos en Variables.
  - Llamarla global y pasarsela a componentes necesarios
  - Guardar local
- Ponerlo en las vistas
  - Carga data y e la psa a componentes
- Figma: Es bueno
  - Separar cosas por componentes (Sirve para segmentar)
  - Se aprende easy

- Don't repeat yourself!!!!!!!!!!
- Headers
- Warning with data handling with JavaScript.

# Set up
[ESLint + Prettier + Vue +  VSCode](https://technicallyfletch.com/how-to-setup-eslint-and-prettier-with-vscode-and-vuejs/)

# Resources
- **Subdomain on Vue**
  - https://medium.com/@apalshah/vue-js-how-to-handle-multiple-subdomains-on-a-single-app-cba9b1f916c4
  - `window.location`
- **Validate Forms**
  - [Vue3 Veevalidate](https://jasonwatmore.com/post/2020/10/01/vue-3-veevalidate-form-validation-example)
  - [Vue 3 Vuelidate](https://medium.com/js-dojo/learn-form-validation-in-vue-3-in-10-minutes-with-vuelidate-8929c5059e66)
  - [Official docs validation](https://es.vuejs.org/v2/cookbook/form-validation.html)
- **Form from Open Json Schema**
  - [Generate form using Json Schemas](https://vuejsfeed.com/blog/generate-forms-using-json-schema-and-vue-js)
  - [FormsSchema Generator](https://bestofvue.com/repo/formschema-native-vuejs-form-generator)
- **Create form**
  - formvuelate
- **Authetication**
  - [Sample JWT witgh Vue3](https://www.bezkoder.com/vue-3-authentication-jwt/)
    - Use Another package just for API services

- `npm config set ignore-scripts false`
- `npm ext .js,.vue srcbin/eslint --fix . --e`

## TODOs:
1. Create parser of jsons from pydantic to formulate.
    - How to define which component to use for a field
    - What are the available components? 
2. In the front end, assume you receive parsed forms and
make them match with formvuelate.
3. How is the front going to send things to the back.

# Pillars on Frontend
- Minimize work and redundancy between back and front (Good to be redundante on using same source. Ex: using json schemas to define forms and basic validations in front and back)
- Define everything through schemas (Forms and form validations)
  - On the backend is through **pydantic**
  - On the front is through **formvuelate**
  - Both of them are really similar, but will need a little bit of help for transformations those transformations are going to be done in the Backend.
    - Back must talk with front on what is the schema for the forms
- Missing how to do the Tenant thing

# User Flow:
- **Login**
  - Login (Already working)
  - Bad Login (We only have a failed login)
    - Be more Explicit
- Create Register Page

# How to start a project
- Create a view
- Create components for the view
- Group by common or particular view
- Atomic Design
- Only view, view and big components. Small components, small components of small components

# VueX
- State
- Mutations
  - 
- Actions
  - Acciones commit a traves de las mutaciones

## Login
- Email
- Password