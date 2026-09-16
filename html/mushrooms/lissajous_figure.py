import tkinter as tk
from tkinter import colorchooser
import math

class LissajousApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Крива Ліссажу (Анімована)")
        self.root.geometry("800x650")
        
        control_frame = tk.Frame(root)
        control_frame.pack(side=tk.TOP, pady=10)
        
        tk.Label(control_frame, text="a (Частота X):").grid(row=0, column=0)
        self.entry_a = tk.Entry(control_frame, width=5)
        self.entry_a.insert(0, "3")
        self.entry_a.grid(row=0, column=1, padx=5)
        
        tk.Label(control_frame, text="b (Частота Y):").grid(row=0, column=2)
        self.entry_b = tk.Entry(control_frame, width=5)
        self.entry_b.insert(0, "2")
        self.entry_b.grid(row=0, column=3, padx=5)
        
        tk.Label(control_frame, text="Фаза (rad):").grid(row=0, column=4)
        self.entry_delta = tk.Entry(control_frame, width=5)
        self.entry_delta.insert(0, "1.57")
        self.entry_delta.grid(row=0, column=5, padx=5)
        
        self.color = "black"
        self.btn_color = tk.Button(control_frame, text="Колір", command=self.choose_color)
        self.btn_color.grid(row=0, column=6, padx=5)
        
        self.btn_draw = tk.Button(control_frame, text="Малювати", command=self.start_drawing)
        self.btn_draw.grid(row=0, column=7, padx=5)
        
        self.status_label = tk.Label(control_frame, text="Готово", fg="green")
        self.status_label.grid(row=0, column=8, padx=10)
        
        self.canvas = tk.Canvas(root, bg="white")
        self.canvas.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        self.is_drawing = False
        self.anim_id = None
        self.t = 0.0
        self.max_time = 2 * math.pi
        
        self.root.after(100, self.start_drawing)

    def choose_color(self):
        color_code = colorchooser.askcolor(title="Виберіть колір")
        if color_code[1]:
            self.color = color_code[1]
            if not self.is_drawing:
                self.start_drawing()

    def start_drawing(self):
        if self.anim_id:
            self.root.after_cancel(self.anim_id)
        
        self.is_drawing = False
        self.canvas.delete("all")
        
        try:
            self.a = float(self.entry_a.get())
            self.b = float(self.entry_b.get())
            self.delta = float(self.entry_delta.get())
        except ValueError:
            self.status_label.config(text="Помилка: коректні числа!", fg="red")
            return
        
        from math import gcd
        lcm = (self.a * self.b) // gcd(int(self.a), int(self.b))
        self.max_time = 2 * math.pi * lcm / max(self.a, self.b)
            
        self.canvas.update()
        width = self.canvas.winfo_width()
        height = self.canvas.winfo_height()
        
        if width <= 1: width = 780
        if height <= 1: height = 580
        
        self.cx = width / 2
        self.cy = height / 2
        self.A = self.cx - 20 
        self.B = self.cy - 20 
        
        self.t = 0.0
        self.prev_x = self.cx + self.A * math.sin(self.a * self.t + self.delta)
        self.prev_y = self.cy + self.B * math.sin(self.b * self.t)
        
        self.is_drawing = True
        self.status_label.config(text="Малюю...", fg="blue")
        self.animate_frame()

    def animate_frame(self):
        if not self.is_drawing:
            return
        
        dt = 0.015
        segments_per_frame = 20
        
        for _ in range(segments_per_frame):
            self.t += dt
            
            if self.t >= self.max_time:
                self.is_drawing = False
                self.status_label.config(text="Готово!", fg="green")
                break
            
            x = self.cx + self.A * math.sin(self.a * self.t + self.delta)
            y = self.cy + self.B * math.sin(self.b * self.t)
            
            self.canvas.create_line(
                self.prev_x, self.prev_y, x, y, 
                fill=self.color, width=2, 
                capstyle=tk.ROUND, joinstyle=tk.ROUND
            )
            
            self.prev_x = x
            self.prev_y = y
        
        if self.is_drawing:
            self.anim_id = self.root.after(7, self.animate_frame)
        else:
            self.anim_id = None

if __name__ == "__main__":
    root = tk.Tk()
    app = LissajousApp(root)
    root.mainloop()

# python lissajous_figure.py