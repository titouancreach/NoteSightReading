import { useEffect, useRef } from "react";
import { Factory, Formatter, Stave, StaveNote, TickContext } from "vexflow";

export function Note({ note }: { note: string}) {
  const output = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vf = new Factory({
      renderer: { elementId: "output", width: 200, height: 200 },
    });

    const context = vf.getContext();

    const staveMeasure1 = new Stave(10, 0, 300);
    staveMeasure1.addClef("treble").setContext(context).draw();

    const notesMeasure1 = [new StaveNote({ keys: [`${note}/4`], duration: "q" })];

    context.scale(1.8, 1.8);
    Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

    return () => {
      if (output.current) {
        output.current.innerHTML = "";
      }
    };
  }, [note]);

  return <div id="output" className="flex justify-center" ref={output} />;
}
