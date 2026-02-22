export function usePasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&#]/.test(password)) score++;

  if (score <= 1) return { bars: 1, label: "Weak", color: "red" };
  if (score <= 3) return { bars: 2, label: "Medium", color: "yellow" };
  return { bars: 3, label: "Strong", color: "green" };
}
