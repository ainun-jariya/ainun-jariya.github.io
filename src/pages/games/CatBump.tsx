import { useRef, useEffect } from "react"

type CatObject = {
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        state: {
            offset: number,
            positionX: number,
            positionY: number
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
    mountain(catObject, 800, 125, 100);
    mountain(catObject, 500, 160, 160);

    ctx.fillStyle = "#555";
    ctx.fillRect(0, 250, canvasWidth, 6);

    // --- Looping Foreground Objects ---
    catObject.state.offset -= 2; // scroll speed
    if (catObject.state.offset < -catObject.canvas.width) catObject.state.offset = 0;

    drawForeground(catObject, catObject.state.offset);
    drawForeground(catObject, catObject.state.offset + catObject.canvas.width);

    drawForeground(catObject, catObject.state.offset);
    drawForeground(catObject, catObject.state.offset + canvasWidth);
}

function drawForeground(catObject: CatObject, startX: number) {
    // Small rocks
    drawPixelRock(catObject, startX + 100, 250);
    drawPixelRock(catObject, startX + 500, 250);
    drawPixelRock(catObject, startX + 900, 250);

    // Cacti
    drawCactus(catObject, startX + 300, 250);
    drawCactus(catObject, startX + 700, 250);
    drawCactus(catObject, startX + 1100, 250);
}

function drawPixelRock(catObject: CatObject, x: number, y: number) {
    if(!catObject.canvas) return
    const canvasWidth = catObject.canvas.width
    const canvasHeight = catObject.canvas.height
    const ctx = catObject.ctx
    ctx.fillStyle = "#444";
    ctx.fillRect(x, y-12, 15, 15);     // main
    ctx.fillRect(x+3, y-8, 10, 10); // bump
}

function drawCactus(catObject: CatObject, x: number, y: number) {
    if(!catObject.canvas) return
    const canvasWidth = catObject.canvas.width
    const canvasHeight = catObject.canvas.height
    const ctx = catObject.ctx
    ctx.fillStyle = "#333";

    // trunk
    ctx.fillRect(x, y - 40, 10, 40);

    // left arm
    ctx.fillRect(x - 10, y - 20, 10, 7);
    ctx.fillRect(x - 7, y - 36, 7, 5);

    // right arm
    ctx.fillRect(x + 10, y - 16, 10, 7);
    ctx.fillRect(x + 10, y - 30, 6, 5);
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

const cat = (catObject: CatObject, startX: number) => {
    if(!catObject.canvas) return
    if(!catObject.ctx) return

    let positionY = catObject.state.positionY
    positionY += 2; // scroll speed
    //if (positionY < catObject.canvas.height) positionY = 0;
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
    const catRef = useRef<CatObject>({
        canvas: canvasRef.current!,
        ctx: ctxRef.current!,
        state: {
            offset: 0,
            positionX: 0,
            positionY: 244
        }
    })

    const movingHandler = (e: KeyboardEvent) => {
        console.log(e.key)
        if(e.key == 'ArrowUp') catRef.current.state.positionY = 200
        else if(e.key == 'ArrowRight' && catRef.current.state.offset == 0) {
            
        }
        else return
    }

    useEffect(() => {
        window.addEventListener('keydown', movingHandler);
        return () => {
            window.removeEventListener('keydown', movingHandler)
        }
    }, [])

    useEffect(()=> {
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext("2d")
        if(!ctx) return
        ctxRef.current = ctx

        catRef.current = {
            canvas: canvasRef.current!,
            ctx: ctxRef.current!,
            state: {
                offset: 0,
                positionX: 0,
                positionY: 244
            }
        }
        loop(catRef.current)
    })

    const loop = (catObject: CatObject) => {
        background(catObject);
        cat(catObject, 0)
        requestAnimationFrame(()=> loop(catObject))
    }

    return (
        <canvas ref={canvasRef} width={window.innerWidth * 80 / 100} height={300}></canvas>
    )
}