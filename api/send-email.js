import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res
        .status(500)
        .json({ error: "Missing EMAIL_USER or EMAIL_PASS env vars" });
    }

    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data || !data.fname || !data.lname || !data.phone || !data.email) {
      return res.status(400).json({ error: "Missing required claimant fields" });
    }

    const message = `
New Roblox Abuse Intake Submission
====================================

── Required Fields ────────────────────────
First Name    : ${data.fname}
Last Name     : ${data.lname}
Home Phone    : ${data.phone}
State         : ${data.state || "N/A"}
Email         : ${data.email}
IP Address    : ${data.IPAddress || "N/A"}
Roblox Abuse  : ${data.RobloxAbuse || "N/A"}

── Additional Info ─────────────────────────
Initial       : ${data.initial || "N/A"}
Mobile Phone  : ${data.mobile || "N/A"}
Address 1     : ${data.address1 || "N/A"}
Address 2     : ${data.address2 || "N/A"}
City          : ${data.city || "N/A"}
Zip           : ${data.zip || "N/A"}
Comments      : ${data.Comments || "N/A"}

── Tracking ────────────────────────────────
Sub ID        : ${data.SubId || "N/A"}
Sub ID 2      : ${data.SubId2 || "N/A"}
Click ID      : ${data.clickid || "N/A"}
T ID          : ${data.t_id || "N/A"}
Vendor Lead ID: ${data.VendorLeadId || "N/A"}

── API Response ────────────────────────────
Status        : ${data.apiStatus || "N/A"}
Response      : ${data.apiResponse || "N/A"}
`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from   : process.env.EMAIL_USER,
      to     : process.env.LEAD_RECEIVER_EMAIL || "mailtoakash@gmail.com",
      subject: `New Roblox Abuse Intake - ${data.fname} ${data.lname}`.trim(),
      text   : message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
}
