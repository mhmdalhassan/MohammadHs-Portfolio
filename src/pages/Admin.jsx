import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../context/ThemeContext";

const TABS = [
  "Personal",
  "Skills",
  "Experience",
  "Education",
  "Projects",
  "Certificates",
  "Languages",
  "Settings",
];

const DEFAULT_AUTH = {
  username: "mohammadHs",
  password: "78910585Hs",
};

export default function Admin() {
  const { data, setData, resetData } = usePortfolio();
  const { themeColors, updateThemeColors } = useTheme();

  const [activeTab, setActiveTab] = useState("Personal");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("adminLoggedIn") === "true",
  );

  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--site-primary", themeColors.primaryColor);
    root.style.setProperty("--site-accent", themeColors.accentColor);
  }, [themeColors]);

  const getAdminAuth = useCallback(() => {
    const saved = localStorage.getItem("adminAuth");
    if (!saved) {
      localStorage.setItem("adminAuth", JSON.stringify(DEFAULT_AUTH));
      return DEFAULT_AUTH;
    }
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.setItem("adminAuth", JSON.stringify(DEFAULT_AUTH));
      return DEFAULT_AUTH;
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAdminAuth();
    if (
      loginFields.username === auth.username &&
      loginFields.password === auth.password
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
      setLoginFields({ username: "", password: "" });
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  const updatePersonal = (field, value) => {
    setData({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  const handleFileUpload = (field, file) => {
    if (!file) return;
    const maxSize = field === "avatar" ? 1024 * 1024 : 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(
        field === "avatar"
          ? "Image must be under 1MB"
          : "File must be under 3MB",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updatePersonal(field, reader.result);
    reader.readAsDataURL(file);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeDate = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `portfolio-backup-${safeDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setData(JSON.parse(reader.result));
        alert("Data imported successfully!");
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-dark-800 border border-white/10 p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black gradient-text mb-2">Login</h1>
            <p className="text-slate-500 text-sm">
              Portfolio Management System
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full bg-dark-900 border border-white/5 rounded-xl px-4 py-3 focus:border-primary-500 transition-all outline-none"
                value={loginFields.username}
                onChange={(e) =>
                  setLoginFields({ ...loginFields, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-dark-900 border border-white/5 rounded-xl px-4 py-3 focus:border-primary-500 transition-all outline-none"
                value={loginFields.password}
                onChange={(e) =>
                  setLoginFields({ ...loginFields, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-400 transform hover:-translate-y-0.5 transition-all shadow-lg shadow-primary-500/20"
            >
              Enter Dashboard
            </button>
          </div>

          <Link
            to="/"
            className="block text-center mt-8 text-slate-500 hover:text-slate-300 text-xs transition-colors"
          >
            ← Back to Public Website
          </Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-200">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 bg-dark-800/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
          <div>
            <span className="text-primary-500 font-bold text-xs uppercase tracking-[0.2em]">
              Administrator
            </span>
            <h1 className="text-4xl font-black text-white mt-1">Console</h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Connected:{" "}
              <span className="text-slate-200 font-medium">
                {data.personal.name}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportJson}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm font-semibold transition-all"
            >
              Backup JSON
            </button>
            <label className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm font-semibold transition-all cursor-pointer">
              Restore Data
              <input
                type="file"
                accept="application/json"
                onChange={importJson}
                className="hidden"
              />
            </label>
            <button
              onClick={() =>
                confirm("Are you sure? This will erase all custom data.") &&
                resetData()
              }
              className="px-5 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl border border-red-500/20 text-sm font-semibold transition-all"
            >
              Factory Reset
            </button>
            <div className="w-[1px] h-10 bg-white/10 mx-2 hidden lg:block" />
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-400 transition-all shadow-lg shadow-primary-500/20"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <aside className="space-y-2 bg-dark-800/30 p-4 rounded-3xl border border-white/5 h-fit sticky top-8">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 ml-4">
              Navigation
            </p>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl transition-all flex items-center justify-between group ${
                  activeTab === tab
                    ? "bg-primary-500 text-white shadow-xl shadow-primary-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <span className="font-bold">{tab}</span>
                {activeTab === tab && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            ))}
          </aside>

          <section className="bg-dark-800 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl min-h-[700px]">
            {activeTab === "Personal" && (
              <PersonalForm
                data={data}
                updatePersonal={updatePersonal}
                handleFileUpload={handleFileUpload}
              />
            )}
            {activeTab === "Skills" && (
              <ArrayEditor
                title="Skills"
                items={data.skills}
                setItems={(items) => setData({ ...data, skills: items })}
                fields={["category", "icon"]}
                nestedField="items"
              />
            )}
            {activeTab === "Experience" && (
              <ArrayEditor
                title="Experience"
                items={data.experience}
                setItems={(items) => setData({ ...data, experience: items })}
                fields={["role", "company", "type", "period"]}
                nestedField="bullets"
              />
            )}
            {activeTab === "Education" && (
              <ArrayEditor
                title="Education"
                items={data.education}
                setItems={(items) => setData({ ...data, education: items })}
                fields={["degree", "institution", "location", "period"]}
                nestedField="bullets"
              />
            )}
            {activeTab === "Projects" && (
              <ArrayEditor
                title="Projects"
                items={data.projects}
                setItems={(items) => setData({ ...data, projects: items })}
                fields={["title", "description", "stack", "github", "live"]}
                nestedField="techStack"
              />
            )}
            {activeTab === "Certificates" && (
              <ArrayEditor
                title="Certificates"
                items={data.certificates}
                setItems={(items) => setData({ ...data, certificates: items })}
                fields={["title", "issuer", "period", "icon"]}
              />
            )}
            {activeTab === "Languages" && (
              <ArrayEditor
                title="Languages"
                items={data.spokenLanguages}
                setItems={(items) =>
                  setData({ ...data, spokenLanguages: items })
                }
                fields={["language", "level", "percent"]}
              />
            )}
            {activeTab === "Settings" && (
              <Settings
                theme={themeColors}
                updateTheme={updateThemeColors}
                getAuth={getAdminAuth}
                data={data}
                setData={setData}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function PersonalForm({ data, updatePersonal, handleFileUpload }) {
  const fields = [
    "name",
    "title",
    "tagline",
    "email",
    "phone",
    "linkedin",
    "github",
    "location",
    "avatarInitials",
    "summary",
  ];
  return (
    <div className="space-y-12">
      <div className="border-b border-white/5 pb-6">
        <h2 className="text-3xl font-black text-white">Profile Identity</h2>
        <p className="text-slate-500 mt-1">
          Manage your basic contact and introduction info.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {fields.map((f) => (
          <div key={f} className={f === "summary" ? "md:col-span-2" : ""}>
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 block ml-1">
              {f}
            </label>
            {f === "summary" ? (
              <textarea
                className="w-full bg-dark-900 border border-white/5 rounded-2xl p-4 min-h-[160px] focus:border-primary-500 transition-all outline-none resize-none"
                value={data.personal[f] || ""}
                onChange={(e) => updatePersonal(f, e.target.value)}
              />
            ) : (
              <input
                className="w-full bg-dark-900 border border-white/5 rounded-2xl p-4 focus:border-primary-500 transition-all outline-none"
                value={data.personal[f] || ""}
                onChange={(e) => updatePersonal(f, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-10">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
          <label className="text-xs font-black text-slate-400 uppercase block mb-4">
            Avatar Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload("avatar", e.target.files[0])}
            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-400 cursor-pointer w-full"
          />
        </div>
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
          <label className="text-xs font-black text-slate-400 uppercase block mb-4">
            Resume (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload("cvUrl", e.target.files[0])}
            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-400 cursor-pointer w-full"
          />
        </div>
      </div>
    </div>
  );
}

function ArrayEditor({ title, items = [], setItems, fields, nestedField }) {
  const moveItem = (from, to) => {
    const copy = [...items];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    setItems(copy);
  };
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      ...Object.fromEntries(fields.map((f) => [f, ""])),
    };
    if (nestedField) newItem[nestedField] = [];
    setItems([...items, newItem]);
  };
  const updateItem = (idx, field, val) => {
    const copy = [...items];
    copy[idx][field] = val;
    setItems(copy);
  };
  const handleNested = (idx, val) => {
    const copy = [...items];
    copy[idx][nestedField] = val.split("\n").filter(Boolean);
    setItems(copy);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white">{title}</h2>
          <p className="text-slate-500 mt-1">
            Add or reorder your {title.toLowerCase()}.
          </p>
        </div>
        <button
          onClick={addItem}
          className="px-6 py-3 bg-primary-500 rounded-2xl text-sm font-black text-white hover:bg-primary-400 shadow-lg shadow-primary-500/20 transition-all active:scale-95"
        >
          + Add New
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="relative p-8 rounded-[32px] bg-[#121214] border border-white/5 group hover:border-white/20 transition-all shadow-lg"
          >
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => moveItem(idx, idx - 1)}
                disabled={idx === 0}
                className="w-8 h-8 bg-dark-800 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary-500 disabled:hidden"
              >
                ↑
              </button>
              <button
                onClick={() => moveItem(idx, idx + 1)}
                disabled={idx === items.length - 1}
                className="w-8 h-8 bg-dark-800 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary-500 disabled:hidden"
              >
                ↓
              </button>
            </div>
            <button
              onClick={() => setItems(items.filter((_, i) => i !== idx))}
              className="absolute top-6 right-8 text-xs font-black text-red-500/50 hover:text-red-500 uppercase tracking-tighter"
            >
              Remove
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {fields.map((f) => (
                <div key={f}>
                  <label className="text-[10px] font-black text-slate-600 uppercase ml-1">
                    {f}
                  </label>
                  <input
                    className="w-full bg-dark-900/50 border border-white/5 rounded-xl p-3.5 mt-1 focus:border-primary-500 outline-none"
                    value={item[f] || ""}
                    onChange={(e) => updateItem(idx, f, e.target.value)}
                  />
                </div>
              ))}
              {nestedField && (
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase ml-1">
                    {nestedField} (One per line)
                  </label>
                  <textarea
                    className="w-full bg-dark-900/50 border border-white/5 rounded-xl p-3.5 mt-1 focus:border-primary-500 outline-none min-h-[100px] resize-none"
                    value={item[nestedField]?.join("\n") || ""}
                    onChange={(e) => handleNested(idx, e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings({ theme, updateTheme, getAuth, data, setData }) {
  const [auth, setAuth] = useState(() => getAuth());
  const handleAuthSave = () => {
    localStorage.setItem("adminAuth", JSON.stringify(auth));
    alert("Updated!");
  };
  const handleFaviconUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const favicon = reader.result;
      setData({ ...data, settings: { ...data.settings, favicon } });
      let link =
        document.getElementById("dynamic-favicon") ||
        document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "icon";
      link.href = favicon;
      if (!document.getElementById("dynamic-favicon"))
        document.head.appendChild(link);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-3xl font-black text-white mb-8 border-b border-white/5 pb-4">
          Security
        </h2>
        <div className="bg-[#121214] p-8 rounded-[32px] border border-white/5 flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 space-y-4 w-full">
            <input
              className="w-full bg-dark-900 border border-white/5 rounded-xl p-4 focus:border-primary-500 outline-none"
              value={auth.username}
              onChange={(e) => setAuth({ ...auth, username: e.target.value })}
              placeholder="Username"
            />
            <input
              className="w-full bg-dark-900 border border-white/5 rounded-xl p-4 focus:border-primary-500 outline-none"
              type="password"
              value={auth.password}
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              placeholder="Password"
            />
          </div>
          <button
            onClick={handleAuthSave}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 font-bold transition-all"
          >
            Update Login
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black text-white mb-8 border-b border-white/5 pb-4">
          Visuals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            ["Primary Color", "primaryColor"],
            ["Accent Color", "accentColor"],
          ].map(([label, key]) => (
            <div
              key={key}
              className="bg-[#121214] p-8 rounded-[32px] border border-white/5"
            >
              <label className="text-xs font-black text-slate-500 uppercase block mb-4">
                {label}
              </label>
              <div className="flex gap-6 items-center">
                <input
                  type="color"
                  className="h-16 w-24 bg-transparent cursor-pointer rounded-lg overflow-hidden"
                  value={theme[key]}
                  onChange={(e) =>
                    updateTheme({ ...theme, [key]: e.target.value })
                  }
                />
                <span className="font-mono text-xl font-bold uppercase tracking-tighter">
                  {theme[key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black text-white mb-8 border-b border-white/5 pb-4">
          Assets
        </h2>
        <div className="bg-[#121214] p-8 rounded-[32px] border border-white/5 space-y-8">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFaviconUpload(e.target.files[0])}
            className="w-full bg-dark-900 p-4 rounded-2xl border border-dashed border-white/20"
          />
          {data?.settings?.favicon && (
            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
              <img
                src={data.settings.favicon}
                alt="favicon"
                className="w-16 h-16 rounded-2xl object-cover bg-dark-900 p-2 shadow-2xl"
              />
              <div>
                <p className="font-black text-white text-lg leading-none">
                  Current Favicon
                </p>
                <p className="text-slate-500 text-sm mt-2 font-medium underline">
                  Dynamic Browser Update Active
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
