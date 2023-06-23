import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const typeDefs = `#graphql
    type Survey {
        surveyId: String
        name: String
        status: String
    }
    
    type Query{
        survey: [Survey]
    }

    type Mutation {
        addSurvey(surveyId: String, name: String, status: String): Survey
        deleteSurvey(surveyId: String): Survey
    }
    `;

const resolvers = {
  Survey: {
    surveys: () => surveys,
  },
  Mutation: {
    addSurvey: (_, { surveyId, name, status }) => {
      const survey = { surveyId, name, status };
      surveys.push(survey);
      return survey;
    },
    deleteSurvey: (_, { surveyId }) => {
      const survey = surveys.find((survey) => survey.surveyId === surveyId);
      surveys.splice(surveys.indexOf(survey), 1);
      return survey;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: 4000 });

console.log(`Server ready at ${url}`);
