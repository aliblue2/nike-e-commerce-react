import { json, redirect } from "react-router-dom";
import { baseurl, client_id, client_secret } from "../App";

export function getEmailAddress() {
  const email = localStorage.getItem("email");
  return email;
}

export function getExpireTime() {
  const expireTime = localStorage.getItem("expires_in");
  const nowHelper = new Date();
  const targetTime = nowHelper.getTime() + parseInt(expireTime);
  const now = new Date().getTime();
  const remainingTime = targetTime - now;
  return remainingTime;
}

export async function updateToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  const data = new FormData();
  data.append("grant_type", "refresh_token");
  data.append("refresh_token", refreshToken);
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  const response = await fetch(baseurl + "/auth/token", {
    body: data,
    method: "POST",
  });

  if (response.status === 401 || response.status === 422) {
    return "EXPIERED";
  }

  if (!response.ok) {
    throw json({
      message: "cannot find way to connect to the server ",
    });
  }

  const { refresh_token, access_token, expires_in } = await response.json();
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_in", expires_in);
  return access_token;
}

export function getAccessToken() {
  let accessToken = localStorage.getItem("access_token");
  const tokenDuration = getExpireTime();
  if (tokenDuration <= 0) {
    accessToken = updateToken();
  }

  return accessToken;
}

export function checkAuthToken() {
  const token = getAccessToken();
  if (token === "EXPIERED") {
    return redirect("/logout");
  }
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return token;
}
