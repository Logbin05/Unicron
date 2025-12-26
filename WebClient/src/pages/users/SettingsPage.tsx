import { MESSAGES } from "@lang/messages";
import { useLanguage } from "@hooks/useLanguage";
import { mockUser, mockFinance } from "@mock/data";

export function SettingsPage() {
  const { lang, setLang } = useLanguage();
  const t = MESSAGES[lang].settings;
  return (
    <section className="max-w-[860px] mx-auto mt-6 sm:mt-10 px-4">
      <div className="relative bg-secondary/90 backdrop-blur rounded-xl p-5 sm:p-8 shadow-lg font-Jura">
        <div className="absolute -inset-0.5 rounded-xl bg-linear-to-br from-fifth/20 to-transparent blur-xl pointer-events-none" />

        <header className="relative mb-8">
          <h1 className="text-25 sm:text-28 2k:text-32 text-sixth font-Tektur">
            {t.title}
          </h1>
          <p className="text-12 sm:text-14 2k:text-18 text-fifth">
            {t.subtitle}
          </p>
        </header>

        <div className="relative space-y-7">
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

            <div>
              <p className="2k:text-18 sm:text-18 text-sixth">
                {mockUser.full_name}
              </p>
              <p className="2k:text-16 text-fifth">@{mockUser.login}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block 2k:text-18 text-fifth mb-1">
                {t.label_1}
              </label>
              <input
                defaultValue={mockUser.full_name}
                className="w-full px-3 py-2.5 rounded-md bg-primary text-sixth 2k:text-18 border border-fourth outline-none focus:border-fifth transition"
              />
            </div>

            <div>
              <label className="block 2k:text-18 text-fifth mb-1">
                {t.label_2}
              </label>
              <input
                defaultValue={mockUser.login}
                className="w-full px-3 py-2.5 rounded-md bg-primary text-sixth 2k:text-18 border border-fourth outline-none focus:border-fifth transition"
              />
            </div>

            <div>
              <label className="block 2k:text-18 text-fifth mb-1">
                {t.label_3}
              </label>
              <input
                defaultValue={mockUser.email}
                className="w-full px-3 py-2.5 rounded-md bg-primary text-sixth 2k:text-18 border border-fourth outline-none focus:border-fifth transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary border border-fourth">
              <span className="block 2k:text-18 text-fifth">{t.label_4}</span>
              <span className="2k:text-18 text-sixth">
                {mockFinance.balance.toFixed(2)}
              </span>
            </div>

            <div className="p-4 rounded-lg bg-primary border border-fourth">
              <span className="block 2k:text-18 text-fifth">{t.label_5}</span>
              <span className="2k:text-18 text-sixth">
                {mockFinance.currency}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary border border-fourth">
            <p className="2k:text-18 text-sixth mb-3">{t.language}</p>

            <div className="flex gap-2">
              <button
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-14 font-medium ${
                  lang === "ru"
                    ? "bg-fifth text-primary"
                    : "bg-secondary text-sixth border border-fourth"
                }`}
                onClick={() => setLang("ru")}
              >
                RU
              </button>
              <button
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-14 font-medium ${
                  lang === "en"
                    ? "bg-fifth text-primary"
                    : "bg-secondary text-sixth border border-fourth"
                }`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg text-14 sm:text-16 font-medium bg-fifth text-primary hover:bg-sixth hover:shadow-lg hover:scale-[1.01] transition">
            {t.save}
          </button>
        </div>
      </div>
    </section>
  );
}
