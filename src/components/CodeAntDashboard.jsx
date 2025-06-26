import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, ProgressBar, ListGroup, Spinner } from 'react-bootstrap';
import CodeAntAI from '../services/codeantAI';

const CodeAntDashboard = () => {
  const [codeAnt, setCodeAnt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [initStatus, setInitStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize CodeAnt AI with mock API key
    const initializeCodeAnt = () => {
      const apiKey = import.meta.env.VITE_CODEANT_API_KEY || 'demo_api_key_12345';
      const projectConfig = {
        projectName: import.meta.env.VITE_APP_NAME || 'FER-PE',
        repository: import.meta.env.VITE_GITHUB_REPO || 'github.com/MyNameIsBof/lab3',
        language: 'javascript',
        framework: 'react'
      };
      
      const codeAntInstance = new CodeAntAI(apiKey, projectConfig);
      setCodeAnt(codeAntInstance);
    };

    initializeCodeAnt();
  }, []);

  const handleInitializeProject = async () => {
    if (!codeAnt) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await codeAnt.initializeProject();
      setInitStatus(result);
    } catch (err) {
      setError(`Initialization failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!codeAnt) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await codeAnt.generateReport();
      if (result.success) {
        setReport(result.report);
      } else {
        setError(`Report generation failed: ${result.error}`);
      }
    } catch (err) {
      setError(`Report generation failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getSecurityBadgeVariant = (score) => {
    if (score >= 9) return 'success';
    if (score >= 7) return 'warning';
    return 'danger';
  };

  const getQualityBadgeVariant = (score) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'danger';
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 text-center mb-4">
            🤖 CodeAnt AI Integration Demo
          </h1>
          <p className="lead text-center text-muted">
            Comprehensive code analysis, security scanning, and AI-powered recommendations
          </p>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <Card.Title>🚀 Project Initialization</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Initialize your project with CodeAnt AI to start monitoring code quality and security.</p>
              
              {initStatus && (
                <Alert variant={initStatus.success ? 'success' : 'danger'} className="mb-3">
                  {initStatus.success ? initStatus.message : initStatus.error}
                  {initStatus.success && initStatus.projectId && (
                    <div className="mt-2">
                      <small>Project ID: <code>{initStatus.projectId}</code></small>
                    </div>
                  )}
                </Alert>
              )}
              
              <Button 
                variant="primary" 
                onClick={handleInitializeProject}
                disabled={loading}
                className="w-100"
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Initializing...
                  </>
                ) : (
                  'Initialize Project'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <Card.Title>📊 Generate Analysis Report</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Run comprehensive analysis including security scan, quality metrics, and AI recommendations.</p>
              
              <Button 
                variant="success" 
                onClick={handleGenerateReport}
                disabled={loading || !initStatus?.success}
                className="w-100"
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Analyzing...
                  </>
                ) : (
                  'Generate Report'
                )}
              </Button>
              
              {!initStatus?.success && (
                <small className="text-muted d-block mt-2">
                  Please initialize the project first
                </small>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {report && (
        <>
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title>📈 Analysis Overview</Card.Title>
                  <small className="text-muted">Generated: {new Date(report.timestamp).toLocaleString()}</small>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <div className="text-center">
                        <h3>Security Score</h3>
                        <Badge 
                          bg={getSecurityBadgeVariant(report.security.securityScore)} 
                          className="fs-4 p-3"
                        >
                          {report.security.securityScore}/10
                        </Badge>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <h3>Quality Score</h3>
                        <Badge 
                          bg={getQualityBadgeVariant(report.quality.qualityScore)} 
                          className="fs-4 p-3"
                        >
                          {report.quality.qualityScore}/10
                        </Badge>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <h3>Issues Found</h3>
                        <Badge bg="info" className="fs-4 p-3">
                          {report.analysis.results?.issuesFound || 0}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100">
                <Card.Header>
                  <Card.Title>🛡️ Security Analysis</Card.Title>
                </Card.Header>
                <Card.Body>
                  {report.security.vulnerabilities?.length > 0 ? (
                    <ListGroup variant="flush">
                      {report.security.vulnerabilities.map((vuln, index) => (
                        <ListGroup.Item key={index}>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6>{vuln.id}</h6>
                              <p className="mb-1">{vuln.description}</p>
                              <small className="text-success">Fix: {vuln.fix}</small>
                            </div>
                            <Badge bg={vuln.severity === 'High' ? 'danger' : vuln.severity === 'Medium' ? 'warning' : 'info'}>
                              {vuln.severity}
                            </Badge>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="success">
                      <i className="bi bi-check-circle"></i> No security vulnerabilities found!
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100">
                <Card.Header>
                  <Card.Title>📊 Quality Metrics</Card.Title>
                </Card.Header>
                <Card.Body>
                  {report.quality.metrics && (
                    <>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Maintainability Index</span>
                          <strong>{report.quality.metrics.maintainabilityIndex}</strong>
                        </div>
                        <ProgressBar now={report.quality.metrics.maintainabilityIndex} max={100} />
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Test Coverage</span>
                          <strong>{report.quality.metrics.testCoverage}%</strong>
                        </div>
                        <ProgressBar now={report.quality.metrics.testCoverage} max={100} />
                      </div>
                      
                      <Row className="text-center">
                        <Col>
                          <h6>Complexity</h6>
                          <Badge bg="secondary">{report.quality.metrics.cyclomaticComplexity}</Badge>
                        </Col>
                        <Col>
                          <h6>Code Smells</h6>
                          <Badge bg="warning">{report.quality.metrics.codeSmells}</Badge>
                        </Col>
                        <Col>
                          <h6>Tech Debt</h6>
                          <Badge bg="info">{report.quality.metrics.technicalDebt}</Badge>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title>🤖 AI Recommendations</Card.Title>
                </Card.Header>
                <Card.Body>
                  {report.recommendations?.length > 0 ? (
                    <Row>
                      {report.recommendations.map((rec, index) => (
                        <Col md={4} key={index} className="mb-3">
                          <Card className="h-100">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6>{rec.category}</h6>
                                <Badge bg={rec.priority === 'High' ? 'danger' : rec.priority === 'Medium' ? 'warning' : 'info'}>
                                  {rec.priority}
                                </Badge>
                              </div>
                              <p className="text-muted small">{rec.message}</p>
                              <h6>Actions:</h6>
                              <ul className="small">
                                {rec.actions.map((action, actionIndex) => (
                                  <li key={actionIndex}>{action}</li>
                                ))}
                              </ul>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Alert variant="info">No recommendations at this time. Great job!</Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>ℹ️ About This Demo</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>
                This demo showcases how CodeAnt AI integration would work in your React application. 
                The demo includes:
              </p>
              <ul>
                <li><strong>Project Initialization:</strong> Connect your repository to CodeAnt AI</li>
                <li><strong>Security Scanning:</strong> Identify vulnerabilities and security issues</li>
                <li><strong>Code Quality Analysis:</strong> Measure maintainability, complexity, and technical debt</li>
                <li><strong>AI Recommendations:</strong> Get intelligent suggestions for improvements</li>
                <li><strong>Real-time Monitoring:</strong> Continuous analysis of code changes</li>
              </ul>
              
              <Alert variant="warning" className="mt-3">
                <strong>Note:</strong> This is a simulation. To use actual CodeAnt AI, you would need:
                <ul className="mb-0 mt-2">
                  <li>Valid API key from CodeAnt AI</li>
                  <li>Proper authentication setup</li>
                  <li>Real API endpoints configuration</li>
                </ul>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeAntDashboard;
