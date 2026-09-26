type ContactRequestEmailProps = {
  firstName: string | null;
  email: string;
  subject: "ACCOMMODATION" | "OTHER";
  accommodationName: string | null;
  message: string;
};

const formatFirstName = (firstName: string | null) => {
  if (!firstName) {
    return "Non renseigné";
  }

  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};

export const ContactRequestEmail = ({
  firstName,
  email,
  subject,
  accommodationName,
  message,
}: ContactRequestEmailProps) => {
  const subjectLabel =
    subject === "ACCOMMODATION" ? "Question sur un logement" : "Autre demande";

  return (
    <div
      style={{
        margin: 0,
        backgroundColor: "#f5f3ef",
        padding: "32px 16px",
        fontFamily: "Arial, sans-serif",
        color: "#27241f",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: "620px",
          backgroundColor: "#ffffff",
          border: "1px solid #e8e3da",
        }}
      >
        <div
          style={{
            padding: "32px",
            borderBottom: "1px solid #e8e3da",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#b17a3f",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Nouvelle demande
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Nouvelle demande de contact
          </h1>
        </div>

        <div style={{ padding: "32px" }}>
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{
              width: "100%",
              marginBottom: "28px",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "38%",
                    padding: "8px 16px 8px 0",
                    color: "#777168",
                    verticalAlign: "top",
                  }}
                >
                  Prénom
                </td>

                <td
                  style={{
                    padding: "8px 0",
                    verticalAlign: "top",
                    wordBreak: "break-word",
                  }}
                >
                  {formatFirstName(firstName)}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    width: "38%",
                    padding: "8px 16px 8px 0",
                    color: "#777168",
                    verticalAlign: "top",
                  }}
                >
                  E-mail
                </td>

                <td
                  style={{
                    padding: "8px 0",
                    verticalAlign: "top",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  <a
                    href={`mailto:${email}`}
                    style={{
                      color: "#b17a3f",
                      textDecoration: "underline",
                    }}
                  >
                    {email}
                  </a>
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    width: "38%",
                    padding: "8px 16px 8px 0",
                    color: "#777168",
                    verticalAlign: "top",
                  }}
                >
                  Sujet
                </td>

                <td
                  style={{
                    padding: "8px 0",
                    verticalAlign: "top",
                    wordBreak: "break-word",
                  }}
                >
                  {subjectLabel}
                </td>
              </tr>

              {accommodationName ? (
                <tr>
                  <td
                    style={{
                      width: "38%",
                      padding: "8px 16px 8px 0",
                      color: "#777168",
                      verticalAlign: "top",
                    }}
                  >
                    Logement
                  </td>

                  <td
                    style={{
                      padding: "8px 0",
                      verticalAlign: "top",
                      wordBreak: "break-word",
                    }}
                  >
                    {accommodationName}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>

          <div
            style={{
              borderTop: "1px solid #e8e3da",
              paddingTop: "24px",
            }}
          >
            <p
              style={{
                margin: "0 0 12px",
                color: "#777168",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Message
            </p>

            <p
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
