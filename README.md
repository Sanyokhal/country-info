# HELLO FROM SASHA

Here you will find instructions on how to install packages, run and build project

#### project **COUNTRY-INFO**

# Installing packages

After copying project from github, and opening it in IDE, open terminal and run

```shell
npm i
```

it will install needed packages from package.json file

To run project after installing packages

```shell
npm run dev
```

After testing and developing project you need to build it, so run this in terminal

```shell
npm run build
```

## SOME INSIGHTS ON WORK PROCESS

### - Which additional packages i used in developing

Vue project was initialized via

```shell
npm init vue@latest
```

I selected Typescript support, router by default and css preprocessor.
Additionally, installed Axios package for easier http requests(it can be done with basic js fetch, but axios looks
prettier 😅)

Also installed sass-embedded, so I can write in SCSS, not in plain css

### - SOME COMMENTS ON TASKS

To access .env variable in project, you need to use `import.meta.env.PROP_NAME`, also prop name should start
with `VITE_`.

In .env file you will see example 'api_key'(nager don't require any API key) and it will be
named `VITE_EXAMPLE_API_ENDPOINT`.

Function to make http request written in separate ts file and then imported when needed, to get rid of code repeating
(you can find it in components/ts/requests.ts).

Also added very basic validation on router props(coutry_code can't be less than 2 characters and more than 2 characters,
there's shouldn't be any numbers).

Created one component for widget - WidgetItem, it requires object to be passed. Using more components for such tasks may
be overkill in my opinion.

.env file will be pushed on github as example, and wouldn't contain any real data, only randomly generated hash for
variable. 