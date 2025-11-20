import { useRef, useEffect } from "react"

type CatObject = {
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        state: {
            offset: number
        }
    }

const background = (catObject: CatObject) => {
    if(!catObject.canvas) return
    const canvasWidth = catObject.canvas.width
    const canvasHeight = catObject.canvas.height
    const ctx = catObject.ctx
    ctx.clearRect(0,0, canvasWidth, canvasHeight)
    ctx.fillStyle='#f5f5f5'
    ctx.fillRect(0,0, canvasWidth, canvasHeight)

    mountain(catObject, 50, 120, 120);
    mountain(catObject, 500, 160, 160);
    mountain(catObject, 800, 125, 100);

    ctx.fillStyle = "#555";
    ctx.fillRect(0, 250, canvasWidth, 6);

    // --- Looping Foreground Objects ---
    catObject.state.offset -= 2; // scroll speed
    if (catObject.state.offset < -canvasWidth) catObject.state.offset = 0;

    drawForeground(catObject, catObject.state.offset);
    drawForeground(catObject, catObject.state.offset + canvasWidth);
}

function drawForeground(catObject: CatObject, startX: number) {
    // Small rocks
    drawPixelRock(catObject, startX + 100, 250);
    drawPixelRock(catObject, startX + 300, 250);

    // Cacti
    drawCactus(catObject, startX + 180, 250);
    drawCactus(catObject, startX + 500, 250);
}

function drawPixelRock(catObject: CatObject, x: number, y: number) {
    if(!catObject.canvas) return
    const canvasWidth = catObject.canvas.width
    const canvasHeight = catObject.canvas.height
    const ctx = catObject.ctx
    ctx.fillStyle = "#444";
    ctx.fillRect(x, y, 4, 4);     // main
    ctx.fillRect(x+3, y-2, 3, 3); // bump
}

function drawCactus(catObject: CatObject, x: number, y: number) {
    if(!catObject.canvas) return
    const canvasWidth = catObject.canvas.width
    const canvasHeight = catObject.canvas.height
    const ctx = catObject.ctx
    ctx.fillStyle = "#333";

    // trunk
    ctx.fillRect(x, y - 20, 6, 20);

    // left arm
    ctx.fillRect(x - 4, y - 16, 4, 10);
    ctx.fillRect(x - 4, y - 16, 4, 3);

    // right arm
    ctx.fillRect(x + 6, y - 14, 4, 12);
    ctx.fillRect(x + 6, y - 14, 4, 3);
}

const mountain = (catObject: CatObject, x:number, baseY:number, height:number) => {
    catObject.ctx.fillStyle = "#d0d0d0";
    catObject.ctx.beginPath()
    catObject.ctx.moveTo(x, baseY);
    catObject.ctx.lineTo(x + height, baseY);
    catObject.ctx.lineTo(x + height / 2, baseY - height);
    catObject.ctx.closePath();
    catObject.ctx.fill();
}

const cat = (catObject: CatObject) => {
    if(!catObject.canvas) return
    if(!catObject.ctx) return

    const positionY = 244

    const ctx = catObject.ctx
    ctx.fillRect(15,positionY - 30,2,5)
    ctx.fillRect(23,positionY - 30,2,5)
    ctx.fillRect(13,positionY - 25,14,10)
    ctx.fillRect(0,positionY - 15,20,15)
    ctx.fillRect(2,positionY - 0,3,10)
    ctx.fillRect(15,positionY - 0,3,10)

}

export default function CatBump() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

    useEffect(()=> {
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext("2d")
        if(!ctx) return
        ctxRef.current = ctx

        const catObject: CatObject = {
        canvas: canvasRef.current!,
        ctx: ctxRef.current!,
        state: {
            offset: 0
        }
    }
        loop(catObject)
    })

    const loop = (catObject: CatObject) => {
        background(catObject);
        cat(catObject)
        requestAnimationFrame(()=> loop(catObject))
    }

    return (
        <canvas ref={canvasRef} width={window.innerWidth * 80 / 100} height={300}></canvas>
    )
}