import fs from "node:fs";
import path from "node:path";
import axios from "axios";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

async function sendTemplateMessage() {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      // Pass the JS object directly; axios handles stringification automatically
      data: {
        messaging_product: "whatsapp",
        to: process.env.RECIPIENT_PHONE_NUMBER || "2347052883191",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      },
    });

    console.log("Message sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message,
    );
  }
}

// sendTemplateMessage();

// https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages

async function sendTextMessage() {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      // Pass the JS object directly; axios handles stringification automatically
      data: {
        messaging_product: "whatsapp",
        to: process.env.RECIPIENT_PHONE_NUMBER || "2347052883191",
        type: "text",
        text: {
          body: "This is a text message",
        },
      },
    });

    console.log("Message sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message,
    );
  }
}

// sendTextMessage()

async function sendMediaMessage() {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      // Pass the JS object directly; axios handles stringification automatically
      data: {
        messaging_product: "whatsapp",
        to: process.env.RECIPIENT_PHONE_NUMBER || "2347052883191",
        type: "image",
        image: {
          //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmSYUSP9No4K4EdjY8xuvcP2ZAk_MyOZaTBNtC_5Nfg&s=10",
          id: "27812666238401285",
          caption: "Beautiful people.",
        },
      },
    });

    console.log("Message sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message,
    );
  }
}

sendMediaMessage();

async function uploadImage() {
  try {
    const fileName = "models.jpg";
    const filePath = path.join(process.cwd(), fileName);

    // 1. Read local file as a Buffer
    const fileBuffer = fs.readFileSync(filePath);

    // 2. Convert Buffer to a Blob (MIME type must be a string)
    const blob = new Blob([fileBuffer], { type: "image/jpeg" });

    // 3. Construct native FormData
    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    formData.append("file", blob, fileName);

    // 4. Send POST request to Meta's media endpoint
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/media`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
      },
    );

    console.log("✅ File uploaded successfully!");
    console.log("Media ID:", response.data.id);

    return response.data.id;
  } catch (error) {
    console.error(
      "❌ Error uploading file:",
      error.response ? error.response.data : error.message,
    );
  }
}
// https://developers.facebook.com/docs/whatsapp/api/message/media
// uploadImage();
