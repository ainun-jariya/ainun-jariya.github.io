import { useRef, useEffect } from "react"

type Dino = {
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        state: {
            offset: number
        }
    }

const background = (dino: Dino) => {
    if(!dino.canvas) return
    const canvasWidth = dino.canvas.width
    const canvasHeight = dino.canvas.height
    const ctx = dino.ctx
    ctx.clearRect(0,0, canvasWidth, canvasHeight)
    ctx.fillStyle='#f5f5f5'
    ctx.fillRect(0,0, canvasWidth, canvasHeight)
    mountain(dino, 50, 120, 60)
}

const mountain = (dino: Dino, x:number, baseY:number, height:number) => {
    dino.ctx.fillStyle = "#d0d0d0";
    dino.ctx.beginPath()
    dino.ctx.moveTo(x, baseY);
    dino.ctx.lineTo(x + height, baseY);
    dino.ctx.lineTo(x + height / 2, baseY - height);
    dino.ctx.closePath();
    dino.ctx.fill();
}

export default function GamesInJavascript() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

    const dino: Dino = {
        canvas: canvasRef.current!,
        ctx: ctxRef.current!,
        state: {
            offset: 0
        }
    }

    useEffect(()=> {
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext("2d")
        if(!ctx) return
        ctxRef.current = ctx

        loop(dino)
    }, [dino])

    const loop = (dino: Dino) => {
        background(dino);
        requestAnimationFrame(()=> loop(dino))
    }

    return (
        <canvas ref={canvasRef} width={window.innerWidth * 80 / 100} height={300}></canvas>
    )
}