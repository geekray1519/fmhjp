"use client";

import { useState, useCallback } from "react";
import { User, Mail, MessageSquare } from "lucide-react";
import { useToast } from "./ToastProvider";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "お名前を入力してください";
        return undefined;
      case "email":
        if (!value.trim()) return "メールアドレスを入力してください";
        if (!EMAIL_REGEX.test(value)) return "有効なメールアドレスを入力してください";
        return undefined;
      case "subject":
        if (!value.trim()) return "件名を入力してください";
        return undefined;
      case "message":
        if (!value.trim()) return "メッセージを入力してください";
        if (value.trim().length < 10) return "メッセージは10文字以上で入力してください";
        return undefined;
    }
  }, []);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;
    for (const field of ["name", "email", "subject", "message"] as const) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    }

    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(newErrors);

    if (hasErrors) return;

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
    showToast("お問い合わせを送信しました。ありがとうございます。");
  }, [formData, validateField, showToast]);

  const inputClassName = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
      errors[field] && touched[field]
        ? "border-red-500/50 focus:ring-red-500/50"
        : "border-border focus:ring-accent"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl border border-border bg-card" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          <div className="flex items-center gap-2">
            <User size={16} className="text-accent" />
            お名前 <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="山田太郎"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-required="true"
          aria-invalid={!!errors.name && touched.name}
          aria-describedby={errors.name && touched.name ? "name-error" : undefined}
          autoComplete="name"
          className={inputClassName("name")}
        />
        {errors.name && touched.name && (
          <p id="name-error" className="text-red-500 text-xs mt-1.5 animate-slide-up" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-accent" />
            メールアドレス <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-required="true"
          aria-invalid={!!errors.email && touched.email}
          aria-describedby={errors.email && touched.email ? "email-error" : undefined}
          autoComplete="email"
          className={inputClassName("email")}
        />
        {errors.email && touched.email && (
          <p id="email-error" className="text-red-500 text-xs mt-1.5 animate-slide-up" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-accent" />
            件名 <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="お問い合わせの件名"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          aria-required="true"
          aria-invalid={!!errors.subject && touched.subject}
          aria-describedby={errors.subject && touched.subject ? "subject-error" : undefined}
          className={inputClassName("subject")}
        />
        {errors.subject && touched.subject && (
          <p id="subject-error" className="text-red-500 text-xs mt-1.5 animate-slide-up" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-accent" />
            メッセージ <span className="text-red-500">*</span>
          </div>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="お問い合わせの内容をお書きください..."
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-required="true"
          aria-invalid={!!errors.message && touched.message}
          aria-describedby={errors.message && touched.message ? "message-error" : undefined}
          className={`${inputClassName("message")} resize-none`}
        />
        {errors.message && touched.message && (
          <p id="message-error" className="text-red-500 text-xs mt-1.5 animate-slide-up" role="alert">
            {errors.message}
          </p>
        )}
        <p className="text-[10px] text-muted mt-1 text-right">
          {formData.message.length} / 10文字以上
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            送信中...
          </span>
        ) : (
          "送信"
        )}
      </button>
    </form>
  );
}
