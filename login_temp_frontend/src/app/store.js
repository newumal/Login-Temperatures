import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import weatherReducer from "../features/weatherSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    weather: weatherReducer
  }
})

export class store {
}