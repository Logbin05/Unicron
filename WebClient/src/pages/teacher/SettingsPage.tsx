import { useState } from "react";
import { MESSAGES } from "@lang/teacher/messages";
import { useLanguage } from "@hooks/useLanguage";
import { mockUser, mockFinance } from "@mock/data";

export function TSettingsPage() {
  const { lang, setLang } = useLanguage();
  const t = MESSAGES[lang].settings;

  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  function handleSave() {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
    }, 1200);
  }

  return (
    <section className="max-w-[860px] mx-auto mt-6 sm:mt-10 px-4">
      <div className="relative bg-secondary/90 backdrop-blur rounded-xl p-5 sm:p-8 shadow-lg font-Jura">
        <div className="absolute -inset-0.5 rounded-xl bg-linear-to-br from-fifth/20 to-transparent blur-xl pointer-events-none" />

        <header className="relative mb-8 space-y-2">
          <h1 className="text-25 sm:text-28 2k:text-32 text-sixth font-Tektur">
            {t.title}
          </h1>
          <p className="text-12 sm:text-14 2k:text-18 text-fifth">
            {t.subtitle}
          </p>
        </header>

        <div className="relative space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={mockUser.avatar}
                alt="avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-fourth"
              />
              {mockUser.is_verified && (
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-secondary" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sixth text-18">{mockUser.full_name}</p>
              <p className="text-fifth">@{mockUser.login}</p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary border border-fourth text-12 text-fifth w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Teacher account
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-fifth mb-1">{t.label_1}</label>
              <input
                defaultValue={mockUser.full_name}
                onChange={() => setIsDirty(true)}
                className="w-full px-3 py-2.5 rounded-md bg-primary text-sixth border border-fourth outline-none focus:border-fifth transition"
              />
            </div>

            <div>
              <label className="block text-fifth mb-1">{t.label_2}</label>
              <input
                defaultValue={mockUser.login}
                onChange={() => setIsDirty(true)}
                className="w-full px-3 py-2.5 rounded-md bg-primary text-sixth border border-fourth outline-none focus:border-fifth transition"
              />
            </div>

            <div>
              <label className="block text-fifth mb-1">{t.label_3}</label>
              <input
                defaultValue={mockUser.email}
                onChange={() => setIsDirty(true)}
                className="w-full px-3 py-2.5 rounded-md bg-primary text-sixth border border-fourth outline-none focus:border-fifth transition"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-primary border border-fourth space-y-4">
            <h3 className="text-sixth text-16 font-medium">Teaching profile</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-fifth mb-1">Specialization</label>
                <input
                  placeholder="Frontend, UI/UX, Math..."
                  onChange={() => setIsDirty(true)}
                  className="w-full px-3 py-2.5 rounded-md bg-secondary text-sixth border border-fourth outline-none focus:border-fifth transition"
                />
              </div>

              <div>
                <label className="block text-fifth mb-1">Experience</label>
                <select
                  onChange={() => setIsDirty(true)}
                  className="w-full px-3 py-2.5 rounded-md bg-secondary text-sixth border border-fourth outline-none focus:border-fifth transition"
                >
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-fifth mb-1">Bio</label>
              <textarea
                rows={4}
                placeholder="Short description for students..."
                onChange={() => setIsDirty(true)}
                className="w-full px-3 py-2.5 rounded-md bg-secondary text-sixth border border-fourth outline-none focus:border-fifth transition resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary border border-fourth">
              <span className="block text-fifth">{t.label_4}</span>
              <span className="text-sixth font-medium">
                {mockFinance.balance.toFixed(2)}
              </span>
            </div>

            <div className="p-4 rounded-lg bg-primary border border-fourth">
              <span className="block text-fifth">{t.label_5}</span>
              <span className="text-sixth font-medium">
                {mockFinance.currency}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary border border-fourth space-y-3">
            <p className="text-sixth">{t.language}</p>

            <div className="flex gap-2">
              {(["ru", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setLang(lng);
                    setIsDirty(true);
                  }}
                  className={`px-4 py-2 rounded-md text-14 font-medium transition ${
                    lang === lng
                      ? "bg-fifth text-primary"
                      : "bg-secondary text-sixth border border-fourth"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary border border-fourth space-y-2">
            <p className="text-sixth">Security</p>

            <button className="text-fifth text-14 hover:underline block">
              Change password
            </button>

            <button className="text-red-400 text-14 hover:underline block">
              Logout from all sessions
            </button>
          </div>

          <button
            disabled={!isDirty || isSaving}
            onClick={handleSave}
            className={`w-full py-3 rounded-lg text-14 sm:text-16 font-medium transition ${
              isDirty
                ? "bg-fifth text-primary hover:bg-sixth hover:shadow-lg"
                : "bg-secondary text-fifth cursor-not-allowed"
            }`}
          >
            {isSaving ? "Saving..." : t.save}
          </button>
        </div>
      </div>
    </section>
  );
}
