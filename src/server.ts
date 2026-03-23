import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


const renderOGPage = (title: string, description: string, color: string = "#97f9ff", image: string = "", url: string = "https://absolute-seven.vercel.app/") => {
    const finalImage = image || "https://i.pinimg.com/originals/de/1d/11/de1d115c605fa0ca159ad2311e2f697a.gif";
    
    const escapedDesc = description.replace(/"/g, '&quot;');
    const formattedDesc = description
        .replace(/\n/g, '<br>') 
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
        .replace(/__(.*?)__/g, '<u>$1</u>') 
        .replace(/`(.*?)`/g, '<code>$1</code>') 
        .replace(/^> (.*)/gm, '<blockquote>$1</blockquote>'); 

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Critical Open Graph Tags for Discord -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${escapedDesc}" />
    <meta property="og:image" content="${finalImage}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="${color}">
    <meta name="twitter:card" content="summary_large_image">
    
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
            position: relative;
        }
        .author { font-size: 0.8rem; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .title { font-weight: bold; font-size: 1rem; margin-bottom: 8px; color: #00a8fc; text-decoration: none; display: block; }
        .desc { color: #dbdee1; font-size: 0.9rem; line-height: 1.4; white-space: pre-wrap; margin-right: 60px; }
        .desc strong { color: #fff; }
        .desc u { text-decoration: underline; }
        .desc code { background: #2b2d31; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
        .desc blockquote { border-left: 4px solid #4e5058; margin: 4px 0; padding-left: 8px; color: #b5bac1; }
        .avatar {
            position: absolute;
            top: 16px;
            right: 20px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
        }
        .footer { font-size: 0.75rem; color: #949ba4; margin-top: 12px; }
    </style>
</head>
<body>
    <div class="card">
        ${image ? `<img src="${image}" class="avatar" alt="avatar">` : ''}
        <div class="author">☁️ ﾟılı ﾟ.Tokyo aid ϑρ System</div>
        <div class="title">${title}</div>
        <div class="desc">${formattedDesc}</div>
        <div class="footer">☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve</div>
    </div>
</body>
</html>`;
};



app.get('/embed', (req: Request, res: Response) => {
    const { title = "System", desc = "No description provided", image = "" } = req.query;
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;
    res.send(renderOGPage(title as string, desc as string, "#97f9ff", image as string, fullUrl));
});


app.get('/', (req: Request, res: Response) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;
    res.send(renderOGPage("ℤ𝖊𝖑𝖉𝖗𝖎𝖘 System", "System ready to serve.", "#97f9ff", "", fullUrl));
});

app.listen(port, () => {
    console.log(`[SERVER] OG Meta Server running at http://localhost:${port}`);
});
