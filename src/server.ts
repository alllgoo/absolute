import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

/**
 * Professional HTML template with Server-Side Rendering (SSR) for OG Tags.
 * This is what Discord sees when it fetches the link.
 */
const renderOGPage = (title: string, description: string, color: string = "#2b2d31", image: string = "https://zeldris44.vercel.app/favicon.ico") => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Critical Open Graph Tags for Discord -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="https://zeldris44.vercel.app/" />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="${color}">
    
    <title>${title}</title>
    <style>
        body { 
            background-color: #0f0f0f; 
            color: #dbdee1; 
            font-family: 'gg sans', 'Noto Sans', sans-serif; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            margin: 0; 
        }
        .card { 
            border-left: 4px solid ${color}; 
            padding: 16px 20px; 
            background: #1e1f22; 
            border-radius: 4px; 
            width: 450px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.5); 
        }
        .author { font-size: 0.8rem; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .title { font-weight: bold; font-size: 1rem; margin-bottom: 8px; color: #00a8fc; text-decoration: none; display: block; }
        .desc { color: #dbdee1; font-size: 0.9rem; line-height: 1.4; white-space: pre-wrap; }
        .footer { font-size: 0.75rem; color: #949ba4; margin-top: 12px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="author">☁️ ﾟılı ﾟ.Tokyo aid ϑρ System</div>
        <a href="https://zeldris44.vercel.app/" class="title">${title}</a>
        <div class="desc">${description}</div>
        <div class="footer">☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve</div>
    </div>
</body>
</html>`;
};

// Route for &join -> /join?user=NAME&vc=VC
app.get('/join', (req: Request, res: Response) => {
    const { user = "Someone", vc = "a voice channel" } = req.query;
    res.send(renderOGPage("Voice System", `${user} has joined ${vc}`, "#23a559"));
});

// Route for &ping -> /ping?latency=MS&api=MS
app.get('/ping', (req: Request, res: Response) => {
    const { latency = "0", api = "0" } = req.query;
    res.send(renderOGPage("Ping System", `🏓 Pong!\nLatency: ${latency}ms\nAPI Latency: ${api}ms`, "#5865f2"));
});

// Route for &play -> /play?song=NAME&user=NAME
app.get('/play', (req: Request, res: Response) => {
    const { song = "Unknown Track", user = "Someone" } = req.query;
    res.send(renderOGPage("Music System", `🎶 Now Playing: **${song}**\nRequested by: ${user}`, "#f47fff"));
});

// Route for &uptime -> /uptime?time=TEXT
app.get('/uptime', (req: Request, res: Response) => {
    const { time = "0s" } = req.query;
    res.send(renderOGPage("Uptime System", `🕒 Online for: ${time}`, "#f57731"));
});

// Route for generic messages -> /message?text=TEXT
app.get('/message', (req: Request, res: Response) => {
    const { text = "Hello from Tokyo aid ϑρ" } = req.query;
    res.send(renderOGPage("Message System", text as string, "#00a8fc"));
});

// Route for &error -> /error?msg=TEXT
app.get('/error', (req: Request, res: Response) => {
    const { msg = "An unknown error occurred" } = req.query;
    res.send(renderOGPage("Error", msg as string, "#da373c"));
});

// Default Root
app.get('/', (req: Request, res: Response) => {
    res.send(renderOGPage("ℤ𝖊𝖑𝖉𝖗𝖎𝖘 System", "System ready to serve.", "#2b2d31"));
});

app.listen(port, () => {
    console.log(`[SERVER] OG Meta Server running at http://localhost:${port}`);
});
