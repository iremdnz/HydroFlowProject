// Define an object called RemoteRequestURLs with various API endpoints as its properties
const RemoteRequestURLs = {
  // Basin Requests
  BASIN_GET_ALL_BASINS: "/api/basins/getAllBasins",
  BASIN_SAVE_NEW_BASIN: "/api/basins/saveBasin",
  BASIN_DELETE_BASIN: "/api/basins/deleteBasin",
  BASIN_SAVE_PERMISSIONS: "/api/basins/savePermissions",
  BASIN_FIND_MODELS_OF_BASIN: "/api/basins/findModelsOfBasin",

  //User Requests
  USER_GET_ALL_USERS: "/api/users/getAllUsers",
  USER_SAVE_NEW_USER: "/api/users/saveUser",
  USER_DELETE_USER: "/api/users/deleteUser",
  USER_GIVE_SIMULATION_PERMISSIONS_TO_USER: "/api/users/givePermissionsToUser",
  USER_CHECK_USER_PERMISSIONS_FOR_MODELS: "/api/users/checkUserPermissionsForModels",
  USER_GET_USER_BY_ID: "/api/users/getUserById",

  //Model Requests
  MODEL_GET_ALL_MODELS: "/api/models/getAllModels",
  MODEL_SAVE_NEW_MODEL: "/api/models/saveModel",
  MODEL_DELETE_MODEL: "/api/models/deleteModel",
  MODEL_DOWNLOAD_MODEL_DATA: "/api/models/downloadModelData",
  MODEL_FIND_USER_MODELS: "/api/models/getModelsOfUser",
  MODEL_GET_PARAMETERS: "/api/models/getModelParameters",
  MODEL_SAVE_PARAMETERS: "/api/models/saveModelParameters",
  MODEL_OPTIMIZE: "/api/models/optimize",
  MODEL_DETAILS_OF_MODEL: "/api/models/getDetailsOfModel",
  MODELS_OF_USER: "/api/models/checkModelsOfUser",

  // Session Requests
  SESSION_LOGIN_USER: "/api/session/loginUser",
  SESSION_LOGOUT_USER: "/api/session/logoutUser",
  SESSION_VALIDATE: "/api/session/validateSession",
};

// Export the RemoteRequestURLs object as the default module export
export default RemoteRequestURLs;