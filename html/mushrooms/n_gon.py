import tkinter as tk
from tkinter import colorchooser
import math

class NGonApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Побудова заданого n-кутника")
        self.root.geometry("800x650")

        # Панель керування
        control_frame = tk.Frame(root)
        control_frame.pack(side=tk.TOP, pady=10)

        tk.Label(control_frame, text="Кількість кутів (n):").grid(row=0, column=0)
        self.entry_n = tk.Entry(control_frame, width=5)
        self.entry_n.insert(0, "5")
        self.entry_n.grid(row=0, column=1, padx=5)

        tk.Label(control_frame, text="Радіус (R):").grid(row=0, column=2)
        self.entry_r = tk.Entry(control_frame, width=5)
        self.entry_r.insert(0, "150")
        self.entry_r.grid(row=0, column=3, padx=5)

        self.color = "black"
        self.btn_color = tk.Button(control_frame, text="Колір", command=self.choose_color)
        self.btn_color.grid(row=0, column=4, padx=5)

        self.btn_draw = tk.Button(control_frame, text="Малювати", command=self.draw_ngon)
        self.btn_draw.grid(row=0, column=5, padx=5)

        # Полотно для малювання
        self.canvas = tk.Canvas(root, bg="white")
        self.canvas.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        self.root.after(100, self.draw_ngon)

    def choose_color(self):
        color_code = colorchooser.askcolor(title="Виберіть колір")
        if color_code[1]:
            self.color = color_code[1]
            self.draw_ngon()

    def draw_ngon(self):
        self.canvas.delete("all")
        
        try:
            n = int(self.entry_n.get())
            r = float(self.entry_r.get())
        except ValueError:
            return
            
        if n < 3:
            return # Фігура повинна мати мінімум 3 кути
            
        self.canvas.update()
        width = self.canvas.winfo_width()
        height = self.canvas.winfo_height()
        
        if width <= 1: width = 780
        if height <= 1: height = 580
        
        cx = width / 2
        cy = height / 2
        
        points = []
        # Початковий кут -pi/2, щоб перша вершина була зверху
        start_angle = -math.pi / 2
        
        # Обчислення координат вершин
        for i in range(n):
            angle = start_angle + (2 * math.pi * i) / n
            x = cx + r * math.cos(angle)
            y = cy + r * math.sin(angle)
            points.extend([x, y])
            
        # Малювання n-кутника
        self.canvas.create_polygon(points, outline=self.color, fill="", width=2)

if __name__ == "__main__":
    root = tk.Tk()
    app = NGonApp(root)
    root.mainloop()