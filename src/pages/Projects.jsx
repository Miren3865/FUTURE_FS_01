import { motion } from 'framer-motion';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Chip, Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import Divider from '@mui/material/Divider';
import CodeIcon from '@mui/icons-material/Code';
import { useState, useEffect } from 'react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '2.2rem', md: '3rem' } }}>
          My Projects
        </Typography>
        <Divider sx={{ mb: 4, width: 80, mx: 'auto', borderColor: 'primary.main', borderBottomWidth: 3, borderRadius: 2 }} />
        <Typography variant="body1" paragraph align="center" sx={{ mb: 8, color: 'grey.300', fontSize: { xs: '1rem', md: '1.2rem' } }}>
          Here are some of my recent projects. Each project is a unique challenge that helped me grow as a developer.
        </Typography>

        {loading ? (
          <Typography align="center">Loading projects...</Typography>
        ) : (
          <Grid container spacing={6} justifyContent="center">
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={project.title} sx={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      boxShadow: 6,
                      position: 'relative',
                      overflow: 'visible',
                      background: 'linear-gradient(135deg, #232526 0%, #1c1c1c 100%)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.03)',
                        boxShadow: 12,
                      },
                    }}
                  >
                    {/* Accent bar */}
                    <Box sx={{ height: 6, width: '100%', background: 'linear-gradient(90deg, #90caf9, #f48fb1)', borderTopLeftRadius: 16, borderTopRightRadius: 16, mb: 1 }} />
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 700, fontSize: '1.5rem', mb: 1 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: 48 }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {project.technologies && project.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ pb: 2, pt: 0, px: 2 }}>
                      {project.github && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<CodeIcon />}
                          href={project.github}
                          target="_blank"
                          sx={{ fontWeight: 600, mr: 1 }}
                        >
                          Code
                        </Button>
                      )}
                      {project.live && (
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          startIcon={<LaunchIcon />}
                          href={project.live}
                          target="_blank"
                          sx={{ fontWeight: 600 }}
                        >
                          Live Demo
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </Container>
  );
};

export default Projects; 