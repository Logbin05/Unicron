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
      <div className="relative bg-third rounded-xl p-5 sm:p-8 shadow-lg font-Jura">
        <header className="mb-8 space-y-2">
          <h1 className="text-25 sm:text-28 text-sixth font-Tektur">
            {t.title}
          </h1>
          <p className="text-12 sm:text-14 text-fifth">{t.subtitle}</p>
        </header>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img
              src={mockUser.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border border-fourth"
            />
            {mockUser.is_verified && (
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-secondary" />
            )}
          </div>

          <div>
            <p className="text-sixth text-18">{mockUser.full_name}</p>
            <p className="text-fifth">@{mockUser.login}</p>

            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary border border-fourth text-12 text-fifth">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Teacher account
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="sm:col-span-2">
            <label className="block text-fifth mb-1">{t.label_1}</label>
            <input
              defaultValue={mockUser.full_name}
              onChange={() => setIsDirty(true)}
              className="w-full px-3 py-2 rounded-md bg-primary text-sixth border border-fourth outline-none focus:border-fifth"
            />
          </div>

          <div>
            <label className="block text-fifth mb-1">{t.label_2}</label>
            <input
              defaultValue={mockUser.login}
              onChange={() => setIsDirty(true)}
              className="w-full px-3 py-2 rounded-md bg-primary text-sixth border border-fourth outline-none focus:border-fifth"
            />
          </div>

          <div>
            <label className="block text-fifth mb-1">{t.label_3}</label>
            <input
              defaultValue={mockUser.email}
              onChange={() => setIsDirty(true)}
              className="w-full px-3 py-2 rounded-md bg-primary text-sixth border border-fourth outline-none focus:border-fifth"
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-primary border border-fourth space-y-4 mb-8">
          <h3 className="text-sixth text-16">Teaching profile</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-fifth mb-1">Specialization</label>
              <input
                className="w-full px-3 py-2 rounded-md bg-secondary text-sixth border border-fourth"
                onChange={() => setIsDirty(true)}
              />
            </div>

            <div>
              <label className="block text-fifth mb-1">Experience</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-secondary text-sixth border border-fourth"
                onChange={() => setIsDirty(true)}
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
              rows={3}
              className="w-full px-3 py-2 rounded-md bg-secondary text-sixth border border-fourth resize-none"
              onChange={() => setIsDirty(true)}
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-primary border border-fourth space-y-4 mb-8">
          <h3 className="text-sixth text-16">Social links</h3>

          {["GitHub", "LinkedIn", "Twitter"].map((label) => (
            <input
              key={label}
              placeholder={`${label} URL`}
              className="w-full px-3 py-2 rounded-md bg-secondary text-sixth border border-fourth"
              onChange={() => setIsDirty(true)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-primary border border-fourth">
            <p className="text-fifth">{t.label_4}</p>
            <p className="text-sixth">{mockFinance.balance.toFixed(2)}</p>
          </div>

          <div className="p-4 rounded-lg bg-primary border border-fourth">
            <p className="text-fifth">{t.label_5}</p>
            <p className="text-sixth">{mockFinance.currency}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary border border-fourth mb-8">
          <p className="text-sixth mb-3">{t.language}</p>

          <div className="flex gap-2">
            {(["ru", "en"] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => {
                  setLang(lng);
                  setIsDirty(true);
                }}
                className={`px-4 py-2 rounded-md text-14 ${
                  lang === lng
                    ? "bg-fifth text-primary"
                    : "bg-secondary border border-fourth text-sixth"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!isDirty || isSaving}
          onClick={handleSave}
          className={`w-full py-3 rounded-lg transition ${
            isDirty
              ? "bg-fifth text-primary hover:bg-sixth"
              : "bg-secondary text-fifth cursor-not-allowed"
          }`}
        >
          {isSaving ? "Saving..." : t.save}
        </button>
      </div>
    </section>
  );
}
