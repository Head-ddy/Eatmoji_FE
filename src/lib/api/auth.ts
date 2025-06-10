const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

export async function loginRequest(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "로그인에 실패했습니다.");
    }

    return res.json();
}

export async function signupRequest(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
    }
    
    return res.json();
}