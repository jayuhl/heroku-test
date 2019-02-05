from flask import Flask, render_template
app = Flask(__name__)
@app.route("/")
def home():
   return render_template("index.html")

@app.route("/page2")
def page_2():
   return render_template("page2.html")

@app.route("/page3")
def page_3():
   return render_template("page3.html")

@app.route("/snake")
def snake_1():
   return render_template("snakegame.html")

@app.route("/snake2")
def snake_2():
   return render_template("snaketake2.html")

@app.route("/map")
def my_map():
   return render_template("mymap.html")

if __name__ == "__main__":
   app.run(debug=True)
