import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/project", project);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateProject = (project, history) => async (dispatch) => {
  try {
    console.log(project);
    await axios.post("http://localhost:8080/api/project", project);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/api/project/all");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data,
    // });
  }
};

export const getProject = (projectId, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/project/${projectId}`
    );
    console.log({ res });
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    console.log({ err });
    history.push("/dashboard");
  }
};
