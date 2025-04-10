import { defineBackend } from "@aws-amplify/backend";
import { myApiFunction } from "./functions/api-function/resource";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
  myApiFunction,
});