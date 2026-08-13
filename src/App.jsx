import { useState } from "react";
import PhotoUploader from "./components/PhotoUploader";
import { generateBuilderCard } from "./canvas/renderer";
import { generateTeamFrame } from "./canvas/teamRenderer";
import { generateBuilderId } from "./utils/builderId";
import { generateBuilderPersona } from "./utils/personaEngine";
import "./App.css";

function App() {
  // ==========================================================
  // MODE
  // ==========================================================

  const [mode, setMode] = useState("builder");

  // ==========================================================
  // INDIVIDUAL BUILDER
  // ==========================================================

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [stack, setStack] = useState("");

  // ==========================================================
  // TEAM
  // ==========================================================

  const [teamSize, setTeamSize] = useState(2);

  const [teamMembers, setTeamMembers] = useState([
    {
      name: "",
      photo: null,
    },
    {
      name: "",
      photo: null,
    },
    {
      name: "",
      photo: null,
    },
  ]);

  // ==========================================================
  // RESULT
  // ==========================================================

  const [generatedImage, setGeneratedImage] = useState(null);
  const [generating, setGenerating] = useState(false);

  // ==========================================================
  // RESET RESULT
  // ==========================================================

  const resetResult = () => {
    setGeneratedImage(null);
  };

  // ==========================================================
  // CHANGE MODE
  // ==========================================================

  const handleModeChange = (newMode) => {
    setMode(newMode);
    resetResult();
  };

  // ==========================================================
  // TEAM MEMBER UPDATE
  // ==========================================================

  const updateTeamMember = (index, field, value) => {
    setTeamMembers((current) =>
      current.map((member, memberIndex) =>
        memberIndex === index
          ? {
              ...member,
              [field]: value,
            }
          : member
      )
    );
  };

  // ==========================================================
  // TEAM PHOTO
  // ==========================================================

  const handleTeamPhoto = (index, photoData) => {
    setTeamMembers((current) =>
      current.map((member, memberIndex) =>
        memberIndex === index
          ? {
              ...member,
              photo: photoData,
            }
          : member
      )
    );
  };

  // ==========================================================
  // GENERATE INDIVIDUAL BUILDER
  // ==========================================================

  const handleGenerateBuilder = async () => {
    if (!photo) {
      alert("Please upload a photo first.");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!role.trim()) {
      alert("Please enter your role.");
      return;
    }

    try {
      setGenerating(true);

      const builderPersona = generateBuilderPersona(
        role.trim(),
        stack.trim()
      );

      console.log("Builder Persona:", builderPersona);

      const builderId = generateBuilderId(name.trim());

      console.log("Builder ID:", builderId);

      const result = await generateBuilderCard({
        imageUrl: photo.url,

        name: name.trim(),

        role: role.trim(),

        stack: stack.trim(),

        builderTitle: builderPersona.persona,

        builderPersona: builderPersona.persona,

        builderCategory: builderPersona.category,

        builderId,
      });

      setGeneratedImage(result);

      console.log("Builder card generated:", result);
    } catch (error) {
      console.error(
        "Builder card generation failed:",
        error
      );

      alert(
        "Something went wrong while generating your Builder ID."
      );
    } finally {
      setGenerating(false);
    }
  };

  // ==========================================================
  // GENERATE TEAM FRAME
  // ==========================================================

  const handleGenerateTeam = async () => {
    const activeMembers = teamMembers.slice(
      0,
      teamSize
    );

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    for (
      let index = 0;
      index < activeMembers.length;
      index++
    ) {
      const member = activeMembers[index];

      if (!member.name.trim()) {
        alert(
          `Please enter the name for Team Member ${
            index + 1
          }.`
        );
        return;
      }

      if (!member.photo) {
        alert(
          `Please upload a photo for Team Member ${
            index + 1
          }.`
        );
        return;
      }
    }

    try {
      setGenerating(true);

      const members = activeMembers.map(
        (member, index) => ({
          name: member.name.trim(),

          imageUrl: member.photo.url,

          position: index + 1,
        })
      );

      console.log("Generating Team Frame:", {
        teamSize,
        members,
      });

      const result = await generateTeamFrame({
        members,

        teamSize,

        teamName: "HACKER HOUSE GOA",

        event: "GOA '26",
      });

      setGeneratedImage(result);

      console.log(
        "Team frame generated:",
        result
      );
    } catch (error) {
      console.error(
        "Team frame generation failed:",
        error
      );

      alert(
        "Something went wrong while generating your Team Frame."
      );
    } finally {
      setGenerating(false);
    }
  };

  // ==========================================================
  // GENERATE
  // ==========================================================

  const handleGenerate = async () => {
    if (mode === "builder") {
      await handleGenerateBuilder();
    } else {
      await handleGenerateTeam();
    }
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = () => {
    if (!generatedImage) {
      return;
    }

    const link = document.createElement("a");

    link.href = generatedImage.url;

    link.download =
      mode === "team"
        ? "HH-Goa-Team-Frame.png"
        : "HH-Goa-Builder-ID.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // ==========================================================
  // SHARE TO X
  // ==========================================================

  const handleShare = () => {
    if (!generatedImage) {
      return;
    }

    const shareText =
      mode === "team"
        ? `Just built our Hacker House Goa 2026 Team Frame 🚀\n\n` +
          `Building in Goa. Shipping with the crew.\n\n` +
          `#FrameInGoa #HackerHouseGoa`
        : `Just built my Hacker House Goa 2026 Builder ID 🚀\n\n` +
          `Building in Goa. Shipping with the crew.\n\n` +
          `#FrameInGoa #HackerHouseGoa`;

    const xUrl =
      `https://twitter.com/intent/tweet?text=` +
      encodeURIComponent(shareText);

    window.open(
      xUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <main className="app">
      <section className="generator">

        {/* ================================================== */}
        {/* BRAND */}
        {/* ================================================== */}

        <div className="brand">
          <span>HACKER HOUSE</span>

          <strong>GOA '26</strong>
        </div>

        {/* ================================================== */}
        {/* HERO */}
        {/* ================================================== */}

        <div className="hero">

          <p className="eyebrow">
            {mode === "builder"
              ? "BUILDER ID GENERATOR"
              : "TEAM FRAME GENERATOR"}
          </p>

          <h1>
            BUILD YOUR
            <br />

            <span>IDENTITY.</span>
          </h1>

          <p className="description">
            {mode === "builder"
              ? "Turn your photo into your Hacker House Goa Builder identity."
              : "Bring your team together in one Hacker House Goa frame."}
          </p>

        </div>

        {/* ================================================== */}
        {/* MODE SELECTOR */}
        {/* ================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "34px",
          }}
        >

          {/* BUILDER */}

          <button
            type="button"
            onClick={() =>
              handleModeChange("builder")
            }
            disabled={generating}
            style={{
              padding: "17px 14px",
              borderRadius: "14px",
              border:
                mode === "builder"
                  ? "2px solid #FFE500"
                  : "1px solid rgba(247,240,208,0.22)",
              background:
                mode === "builder"
                  ? "rgba(255,229,0,0.10)"
                  : "rgba(255,255,255,0.035)",
              color:
                mode === "builder"
                  ? "#FFE500"
                  : "#F7F0D0",
              fontWeight: "900",
              cursor: "pointer",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            BUILDER ID

            <span
              style={{
                display: "block",
                marginTop: "5px",
                fontSize: "11px",
                opacity: 0.65,
                fontWeight: "600",
              }}
            >
              PERSONAL
            </span>
          </button>

          {/* TEAM */}

          <button
            type="button"
            onClick={() =>
              handleModeChange("team")
            }
            disabled={generating}
            style={{
              padding: "17px 14px",
              borderRadius: "14px",
              border:
                mode === "team"
                  ? "2px solid #FF2A8A"
                  : "1px solid rgba(247,240,208,0.22)",
              background:
                mode === "team"
                  ? "rgba(255,42,138,0.10)"
                  : "rgba(255,255,255,0.035)",
              color:
                mode === "team"
                  ? "#FF2A8A"
                  : "#F7F0D0",
              fontWeight: "900",
              cursor: "pointer",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            TEAM FRAME

            <span
              style={{
                display: "block",
                marginTop: "5px",
                fontSize: "11px",
                opacity: 0.65,
                fontWeight: "600",
              }}
            >
              2–3 MEMBERS
            </span>
          </button>

        </div>

        {/* ================================================== */}
        {/* BUILDER MODE */}
        {/* ================================================== */}

        {mode === "builder" && (
          <>
            <PhotoUploader
              onPhotoReady={setPhoto}
            />

            {photo && (
              <div className="photo-info">
                <span>PHOTO READY</span>

                <span>
                  {photo.width} × {photo.height}
                </span>
              </div>
            )}

            <div className="identity-form">

              <label>
                YOUR NAME

                <input
                  type="text"
                  placeholder="Nirav Vala"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                />
              </label>

              <label>
                YOUR ROLE

                <input
                  type="text"
                  placeholder="Cybersecurity Engineer"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                />
              </label>

              <label>
                TECH STACK

                <input
                  type="text"
                  placeholder="Python, Linux, Kali"
                  value={stack}
                  onChange={(event) =>
                    setStack(event.target.value)
                  }
                />
              </label>

              <button
                type="button"
                className="generate-button"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating
                  ? "BUILDING YOUR ID..."
                  : "GENERATE BUILDER ID"}
              </button>

            </div>
          </>
        )}

        {/* ================================================== */}
        {/* TEAM MODE */}
        {/* ================================================== */}

        {mode === "team" && (
          <div
            style={{
              width: "100%",
            }}
          >

            {/* TEAM SIZE */}

            <div
              style={{
                marginBottom: "30px",
              }}
            >

              <div
                style={{
                  marginBottom: "12px",
                  color: "#F7F0D0",
                  fontSize: "13px",
                  fontWeight: "900",
                  letterSpacing: "1.5px",
                }}
              >
                HOW MANY BUILDERS?
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >

                {/* 2 MEMBERS */}

                <button
                  type="button"
                  onClick={() => {
                    setTeamSize(2);
                    resetResult();
                  }}
                  disabled={generating}
                  style={{
                    padding: "18px",
                    borderRadius: "14px",
                    border:
                      teamSize === 2
                        ? "2px solid #FFE500"
                        : "1px solid rgba(247,240,208,0.22)",
                    background:
                      teamSize === 2
                        ? "rgba(255,229,0,0.10)"
                        : "rgba(255,255,255,0.035)",
                    color: "#F7F0D0",
                    fontWeight: "900",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  2 BUILDERS
                </button>

                {/* 3 MEMBERS */}

                <button
                  type="button"
                  onClick={() => {
                    setTeamSize(3);
                    resetResult();
                  }}
                  disabled={generating}
                  style={{
                    padding: "18px",
                    borderRadius: "14px",
                    border:
                      teamSize === 3
                        ? "2px solid #FF2A8A"
                        : "1px solid rgba(247,240,208,0.22)",
                    background:
                      teamSize === 3
                        ? "rgba(255,42,138,0.10)"
                        : "rgba(255,255,255,0.035)",
                    color: "#F7F0D0",
                    fontWeight: "900",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  3 BUILDERS
                </button>

              </div>
            </div>

            {/* ================================================= */}
            {/* MEMBERS */}
            {/* ================================================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  teamSize === 3
                    ? "repeat(3, minmax(0, 1fr))"
                    : "repeat(2, minmax(0, 1fr))",
                gap: "18px",
                alignItems: "stretch",
              }}
            >

              {teamMembers
                .slice(0, teamSize)
                .map((member, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "24px 20px",
                      borderRadius: "20px",
                      border:
                        "1px solid rgba(247,240,208,0.20)",
                      background:
                        "rgba(255,255,255,0.045)",

                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",

                      minWidth: 0,
                    }}
                  >

                    {/* MEMBER HEADER */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >

                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          background: "#FFE500",
                          color: "#032B1A",

                          fontWeight: "900",
                          fontSize: "15px",

                          marginBottom: "10px",
                        }}
                      >
                        {index + 1}
                      </div>

                      <div
                        style={{
                          color: "#F7F0D0",
                          fontSize: "15px",
                          fontWeight: "900",
                        }}
                      >
                        BUILDER {index + 1}
                      </div>

                      <div
                        style={{
                          color: "#B8CBAE",
                          fontSize: "11px",
                          marginTop: "4px",
                          letterSpacing: "1px",
                        }}
                      >
                        TEAM MEMBER
                      </div>

                    </div>

                    {/* NAME */}

                    <div
                      style={{
                        width: "100%",
                        marginBottom: "18px",
                      }}
                    >

                      <div
                        style={{
                          color: "#B8CBAE",
                          fontSize: "11px",
                          fontWeight: "800",
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        BUILDER NAME
                      </div>

                      <input
                        type="text"
                        placeholder={
                          index === 0
                            ? "Enter first builder name"
                            : `Enter builder ${
                                index + 1
                              } name`
                        }
                        value={member.name}
                        onChange={(event) =>
                          updateTeamMember(
                            index,
                            "name",
                            event.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          boxSizing: "border-box",

                          padding: "14px 15px",
                          borderRadius: "10px",

                          border:
                            "1px solid rgba(247,240,208,0.25)",

                          background:
                            "rgba(0,0,0,0.15)",

                          color: "#F7F0D0",
                          outline: "none",
                          fontSize: "14px",

                          textAlign: "center",
                        }}
                      />

                    </div>

                    {/* PHOTO LABEL */}

                    <div
                      style={{
                        color: "#B8CBAE",
                        fontSize: "11px",
                        fontWeight: "800",
                        letterSpacing: "1px",
                        marginBottom: "8px",
                      }}
                    >
                      BUILDER PHOTO
                    </div>

                    {/* PHOTO UPLOADER */}

                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <PhotoUploader
                        onPhotoReady={(photoData) =>
                          handleTeamPhoto(
                            index,
                            photoData
                          )
                        }
                      />
                    </div>

                    {/* PHOTO READY */}

                    {member.photo && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "8px 12px",
                          borderRadius: "8px",

                          background:
                            "rgba(255,229,0,0.08)",

                          color: "#FFE500",
                          fontSize: "11px",
                          fontWeight: "800",

                          textAlign: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        PHOTO READY
                      </div>
                    )}

                  </div>
                ))}

            </div>

            {/* ================================================= */}
            {/* TEAM GENERATE */}
            {/* ================================================= */}

            <button
              type="button"
              className="generate-button"
              onClick={handleGenerate}
              disabled={generating}
              style={{
                marginTop: "30px",
                display: "block",
                width: "100%",
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto",

                background:
                  "linear-gradient(90deg, #FFE500, #FF2A8A)",

                color: "#032B1A",

                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.20)",
              }}
            >
              {generating
                ? "BUILDING TEAM FRAME..."
                : `GENERATE ${teamSize}-BUILDER FRAME`}
            </button>

          </div>
        )}

        {/* ================================================== */}
        {/* RESULT */}
        {/* ================================================== */}

        {generatedImage && (
          <section
            className="result"
            style={{
              width: "100%",
              marginTop: "50px",
            }}
          >

            <p className="eyebrow">
              {mode === "team"
                ? "YOUR TEAM FRAME"
                : "YOUR BUILDER ID"}
            </p>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                overflow: "visible",
              }}
            >
              <img
                className="generated-card"
                src={generatedImage.url}
                alt={
                  mode === "team"
                    ? "Generated Hacker House Goa Team Frame"
                    : "Generated Hacker House Goa Builder ID"
                }
                style={{
                  width: "100%",
                  maxWidth: "1080px",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* ACTIONS */}

            <div
              className="result-actions"
              style={{
                marginTop: "24px",
              }}
            >

              <button
                type="button"
                className="download-button"
                onClick={handleDownload}
              >
                DOWNLOAD PNG
              </button>

              <button
                type="button"
                className="share-button"
                onClick={handleShare}
              >
                SHARE TO X ↗
              </button>

            </div>

          </section>
        )}

      </section>
    </main>
  );
}

export default App;