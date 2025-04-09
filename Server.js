const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

// ✅ Direct Supabase setup (no .env)
const supabaseUrl = 'https://qiialzloktpatomqwwgq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpaWFsemxva3RwYXRvbXF3d2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjg2MTMsImV4cCI6MjA1OTcwNDYxM30.lNoqmUkCWSlnwhlPaXjQm57L653nKpTq7TCTCziT454';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.render('login'));

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }  // this stores name in user_metadata
    }
  });

  if (error) {
    return res.render('signup', { error: error.message, success: null });
  }

  res.render('signup', { success: 'Signup successful! Please verify your email.', error: null });
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.render('login', { error: error.message });
  }

  const user = data.user;
  const name = user?.user_metadata?.name || user.email;

  res.render('home', { name });
});




app.get('/stories', (req, res) => {
  res.render('stories'); // this loads views/stories.ejs
});
app.get('/story_1', (req, res) => {
  res.render('story1'); // this loads views/stories.ejs
});
app.get('/story_2', (req, res) => {
  res.render('story2'); // this loads views/stories.ejs
});
app.get('/story_3', (req, res) => {
  res.render('story3'); // this loads views/stories.ejs
});

app.get('/story_4', (req, res) => {
  res.render('story4'); // this loads views/stories.ejs
});
app.get('/story_5', (req, res) => {
  res.render('story5'); // this loads views/stories.ejs
});
app.get('/story_6', (req, res) => {
  res.render('story6'); // this loads views/stories.ejs
});

app.get('/story_7', (req, res) => {
  res.render('story7'); // this loads views/stories.ejs
});
app.get('/story_8', (req, res) => {
  res.render('story8'); // this loads views/stories.ejs
});
app.get('/story_9', (req, res) => {
  res.render('story9'); // this loads views/stories.ejs
});
app.get('/story_10', (req, res) => {
  res.render('story10'); // this loads views/stories.ejs
});



app.get('/logout', (req, res) => {
  // Optional: Clear any session/cookie if used
  res.render('login');
});

app.get('/signup',(req,res)=>{
  res.render('signup');
})
app.get('/login',(req,res)=>{
  res.render('login');
})

app.get('/about',(req,res)=>{
  res.render('about');
})
app.get('/contact',(req,res)=>{
  res.render('contact');
})
app.get('/home',(req,res)=>{
  res.render('home');
})


const PORT = 3005;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
