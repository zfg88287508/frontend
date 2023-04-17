import { createSlice } from "@reduxjs/toolkit";
import { getDepKey } from "../../utils/index";

type UserStoreInterface = {
  user: null;
  departments: string[];
  currentDepId: number;
  isLogin: boolean;
};

let defaultValue: UserStoreInterface = {
  user: null,
  departments: [],
  currentDepId: Number(getDepKey()) || 0,
  isLogin: false,
};

const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    value: defaultValue,
  },
  reducers: {
    loginAction(stage, e) {
      stage.value.user = e.payload.user;
      stage.value.departments = e.payload.departments;
      stage.value.isLogin = true;
      if (e.payload.departments.length > 0 && stage.value.currentDepId === 0) {
        stage.value.currentDepId = e.payload.departments[0].id;
      }
    },
    logoutAction(stage) {
      stage.value.user = null;
      stage.value.departments = [];
      stage.value.isLogin = false;
      stage.value.currentDepId = 0;
    },
    saveCurrentDepId(stage, e) {
      stage.value.currentDepId = e.payload;
    },
  },
});

export default loginUserSlice.reducer;
export const { loginAction, logoutAction, saveCurrentDepId } =
  loginUserSlice.actions;

export type { UserStoreInterface };
