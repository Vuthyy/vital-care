export interface LoginRequest {
  username_or_email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  phone_number: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
}

export interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Register user
export const registerUser = async (
  userData: RegisterRequest
): Promise<AuthResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  const data: AuthResponse = await response.json();
  return data;
};

// Login user
export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    // 401 = wrong username/email/password
    if (response.status === 401) {
      throw new Error("Invalid username/email or password.");
    }

    // other errors (400/500/etc.)
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  const data: AuthResponse = await response.json();

  if (data.access_token) setCookie("access_token", data.access_token, 7);
  if (data.refresh_token) setCookie("refresh_token", data.refresh_token, 30);

  return data;
};

export const isAuthenticated = () => !!getCookie("access_token");

export const getAccessToken = () => getCookie("access_token");

export const logout = () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
};

// Helper for authenticated API requests
export const fetchProtectedData = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = getAccessToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};