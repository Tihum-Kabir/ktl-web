# Kingsforth Platform

The official landing page and platform for Kingsforth, featuring a "Neural Interface" aesthetic, AI-driven surveillance themes, and a responsive design.

## 🚀 Quick Start (Docker)

The easiest way to run the application on any device is using Docker. This ensures all dependencies are bundled correctly.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Run the App
1.  Open a terminal in this project folder.
2.  Run the following command:
    ```bash
    docker-compose up -d --build
    ```
3.  Open your browser to [http://localhost:3000](http://localhost:3000).

### Access from Another Device (LAN)
To view the site from your mobile phone or another computer on the same WiFi:
1.  Find your computer's IP address:
    -   **Windows**: Open Command Prompt and type `ipconfig`. Look for "IPv4 Address" (e.g., `192.168.1.15`).
    -   **Mac/Linux**: Type `ifconfig` or check Network Settings.
2.  On your phone, visit: `http://<YOUR_IP_ADDRESS>:3000` (e.g., `http://192.168.1.15:3000`).

---

## 🛠️ Local Development (No Docker)

If you want to edit the code:

1.  **Install Node.js** (v20 recommended).
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

-   `app/`: Main application pages and layout (Next.js App Router).
-   `components/`: Reusable UI components.
    -   `marketing/`: Landing page specific components (Hero, Navigation, etc.).
    -   `ui/`: Generic UI elements (Buttons, Cards).
-   `public/images/`: All static assets (Logos, SVGs).
-   `docker-compose.yml`: Docker orchestration config.
-   `Dockerfile`: Docker image build instructions.

---

## ☁️ GitHub Repository

This project is linked to: [https://github.com/Tihum-Kabir/ktl-web.git](https://github.com/Tihum-Kabir/ktl-web.git)

To push latest changes:
```bash
git push origin main
```

---

## 🔒 Handling Secrets (.env.local)

The `.env.local` file contains sensitive keys and is **ignored** by Git for security. It will **NOT** be uploaded to GitHub.

**To run the app with your secrets:**

1.  **On the device/server**, create a file named `.env` in the project folder.
2.  Copy the contents of your local `.env.local` into this new `.env` file.
3.  Docker will automatically read this file (configured in `docker-compose.yml`).

---

## 🐳 Understanding Docker (The "Container" Concept)

Think of Docker as a **shipping container** for your code.
-   **Without Docker**: You have to install Node.js, specific libraries, and configure settings manually on every new computer. It's messy and prone to errors.
-   **With Docker**: We package the OS, Node.js, and your code into a single "Image". You can run this image on *any* computer (Windows, Mac, Linux server) and it will work **exactly** the same way.

**How things are managed:**
-   **`Dockerfile`**: A recipe card that tells Docker how to build your app (e.g., "Take Node 20, copy files, run build").
-   **`docker-compose.yml`**: A manager that runs the container with specific settings (ports, environment variables).

---

## 📱 Accessing on Other Devices (LAN)

You can view the running website on your phone, tablet, or colleague's laptop **without installing anything** on their device, as long as you are on the same WiFi.

1.  **Keep the App Running**: Ensure `docker-compose up` is running on your main computer.
2.  **Find Your Local IP**:
    -   **Windows**: Open Command Prompt, type `ipconfig`. Look for `IPv4 Address` (e.g., `192.168.1.15`).
    -   **Mac/Linux**: Terminal -> `ipconfig getifaddr en0`.
3.  **Browse**: On the other device, type `http://<YOUR_IP>:3000` (e.g., `http://192.168.1.15:3000`).

**Note**: This is a live view of your computer. If you turn off your computer, the site goes down for them.

---

## 💾 Running on a NEW Computer (Migration)

If you want to move the entire project to a **completely different computer** and run it there:

1.  **Install Docker Desktop** and **Git** on the new computer.
2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Tihum-Kabir/ktl-web.git
    cd ktl-web
    ```
3.  **Restore Secrets (Vital)**:
    -   Create a `.env` file in the folder.
    -   Paste your Supabase keys (URL and Anon Key) into it. *These are not saved in Git for security.*
4.  **Run**:
    ```bash
    docker-compose up -d --build
    ```

**Will I lose content?**
-   **Database (Supabase)**: No. Your users, logins, and data are stored in the cloud (Supabase). Connecting from a new computer connects to the *same* live database.
-   **Code**: No. Your code is safely stored in GitHub.
-   **Local Config**: You only need to recreate the `.env` file.
