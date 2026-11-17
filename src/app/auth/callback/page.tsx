"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { handleGoogleAuthCallback } from "../../actions/auth";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [isProviderDisabled, setIsProviderDisabled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const processOAuth = async () => {
      try {
        // 1. Check URL parameters for explicit errors from Supabase
        const queryParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(
          window.location.hash.startsWith("#") ? window.location.hash.substring(1) : window.location.hash
        );

        const error = queryParams.get("error") || hashParams.get("error");
        const errorDescription = queryParams.get("error_description") || hashParams.get("error_description");

        if (error) {
          if (!isMounted) return;
          setStatus("error");
          const desc = decodeURIComponent(errorDescription || error);
          setErrorMessage(desc);
          if (
            desc.toLowerCase().includes("not enabled") ||
            desc.toLowerCase().includes("unsupported provider") ||
            desc.toLowerCase().includes("validation_failed")
          ) {
            setIsProviderDisabled(true);
          }
          return;
        }

        // 2. Check for PKCE auth code in URL
        const code = queryParams.get("code");
        if (code) {
          const { data, error: exchangeErr } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeErr) {
            if (!isMounted) return;
            setStatus("error");
            setErrorMessage(exchangeErr.message);
            if (
              exchangeErr.message.toLowerCase().includes("not enabled") ||
              exchangeErr.message.toLowerCase().includes("unsupported")
            ) {
              setIsProviderDisabled(true);
            }
            return;
          }

          if (data?.session?.user) {
            await finalizeLogin(data.session.user);
            return;
          }
        }

        // 3. Check existing session (e.g., implicit hash token automatically parsed by Supabase)
        const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr) {
          if (!isMounted) return;
          setStatus("error");
          setErrorMessage(sessionErr.message);
          return;
        }

        if (sessionData?.session?.user) {
          await finalizeLogin(sessionData.session.user);
          return;
        }

        // 4. Listen once to onAuthStateChange in case token parsing is asynchronous
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
            authListener.subscription.unsubscribe();
            await finalizeLogin(session.user);
          }
        });

        // Timeout fallback if no session received
        setTimeout(() => {
          if (isMounted && status === "loading") {
            setStatus("error");
            setErrorMessage("Tidak menerima sesi dari Google. Pastikan izin Google OAuth telah dikonfigurasi.");
          }
        }, 8000);
      } catch (err: any) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(err.message || "Terjadi kesalahan saat memproses otentikasi.");
      }
    };

    const finalizeLogin = async (user: any) => {
      try {
        const email = user.email || "";
        const name =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          (email ? email.split("@")[0] : "Player");
        const avatar = user.user_metadata?.avatar_url || "👑";

        const res = await handleGoogleAuthCallback({
          id: user.id,
          email,
          name,
          avatar,
        });

        if (res.error) {
          if (!isMounted) return;
          setStatus("error");
          setErrorMessage(res.error);
          return;
        }

        if (!isMounted) return;
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 600);
      } catch (err: any) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(err.message || "Gagal sinkronisasi data user.");
      }
    };

    processOAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        backgroundImage:
          "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#ffffff",
          border: "3px solid #000000",
          borderRadius: "16px",
          boxShadow: "6px 6px 0px 0px #000000",
          padding: "36px 32px",
          textAlign: "center",
        }}
      >
        {status === "loading" && (
          <div>
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "4px solid #f3f4f6",
                borderTop: "4px solid #000000",
                borderRadius: "50%",
                margin: "0 auto 24px auto",
                animation: "spin 1s linear infinite",
              }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#000", marginBottom: "8px" }}>
              Menghubungkan Akun Google...
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}>
              Mohon tunggu sejenak, kami sedang memverifikasi kredensial Anda.
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#dcfce7",
                border: "2.5px solid #000",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                boxShadow: "3px 3px 0px #000",
                fontSize: "28px",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#000", marginBottom: "8px" }}>
              Login Berhasil!
            </h2>
            <p style={{ color: "#4b5563", fontSize: "14px", fontWeight: 500 }}>
              Mengalihkan ke halaman utama 404 Math Game...
            </p>
          </div>
        )}

        {status === "error" && (
          <div>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#fee2e2",
                border: "2.5px solid #000",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                boxShadow: "3px 3px 0px #000",
                fontSize: "28px",
                color: "#dc2626",
              }}
            >
              !
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#000", marginBottom: "12px" }}>
              Autentikasi Google Gagal
            </h2>
            <div
              style={{
                backgroundColor: "#fff1f2",
                border: "2px solid #fda4af",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#be123c",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "20px",
                textAlign: "left",
                wordBreak: "break-word",
              }}
            >
              {errorMessage}
            </div>

            {isProviderDisabled && (
              <div
                style={{
                  backgroundColor: "#eff6ff",
                  border: "2px solid #93c5fd",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  color: "#1e3a8a",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>📌</span> Cara Mengaktifkan Google OAuth di Supabase:
                </div>
                <ol style={{ margin: "0", paddingLeft: "20px" }}>
                  <li>Buka <b>Supabase Dashboard</b> &rarr; Pilih Project Anda.</li>
                  <li>Masuk ke menu <b>Authentication</b> &rarr; <b>Providers</b> &rarr; <b>Google</b>.</li>
                  <li>Nyalakan toggle <b>Enable Sign in with Google</b>.</li>
                  <li>Masukkan <b>Client ID</b> dan <b>Client Secret</b> dari Google Cloud Console.</li>
                  <li>Tambahkan Callback URL Supabase berikut ke Google Cloud Authorized Redirect URIs:
                    <div style={{ backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "4px", border: "1px solid #bfdbfe", marginTop: "4px", fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all" }}>
                      https://tugnqkupzqtsedezyudx.supabase.co/auth/v1/callback
                    </div>
                  </li>
                </ol>
              </div>
            )}

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                backgroundColor: "#2a1a6b",
                color: "#ffffff",
                border: "2.5px solid #000",
                borderRadius: "10px",
                padding: "10px 24px",
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "3px 3px 0px #000",
                transition: "all 0.1s ease",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "1px 1px 0px #000";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translate(0)";
                e.currentTarget.style.boxShadow = "3px 3px 0px #000";
              }}
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

