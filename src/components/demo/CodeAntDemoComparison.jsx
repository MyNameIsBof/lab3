import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, Tabs, Tab } from 'react-bootstrap';
import ProblematicComponent from './ProblematicComponent';
import FixedComponent from './FixedComponent';

const CodeAntDemoComparison = () => {
  const [activeTab, setActiveTab] = useState('comparison');
  const [showProblematic, setShowProblematic] = useState(false);
  const [showFixed, setShowFixed] = useState(false);

  const issues = [
    {
      id: 1,
      severity: 'High',
      category: 'Security',
      title: 'XSS Vulnerability',
      description: 'Direct innerHTML usage without sanitization',
      line: 38,
      solution: 'Use DOMPurify.sanitize() or React state management'
    },
    {
      id: 2,
      severity: 'High',
      category: 'Security',
      title: 'API Key Exposure',
      description: 'API key exposed in URL parameters',
      line: 32,
      solution: 'Move API key to Authorization header and environment variables'
    },
    {
      id: 3,
      severity: 'Medium',
      category: 'Performance',
      title: 'Memory Leak',
      description: 'useEffect without cleanup function',
      line: 20,
      solution: 'Add cleanup function to clear intervals/timeouts'
    },
    {
      id: 4,
      severity: 'Medium',
      category: 'Quality',
      title: 'Missing PropTypes',
      description: 'Component props are not validated',
      line: 10,
      solution: 'Add PropTypes validation for better type safety'
    },
    {
      id: 5,
      severity: 'Medium',
      category: 'Performance',
      title: 'Excessive Polling',
      description: 'API called every second causing performance issues',
      line: 22,
      solution: 'Increase polling interval to 30 seconds or use WebSocket'
    },
    {
      id: 6,
      severity: 'Low',
      category: 'Accessibility',
      title: 'Missing ARIA Labels',
      description: 'Form elements lack proper accessibility attributes',
      line: 85,
      solution: 'Add proper labels, ARIA attributes, and semantic HTML'
    },
    {
      id: 7,
      severity: 'Low',
      category: 'Best Practices',
      title: 'Hardcoded Secrets',
      description: 'API tokens and endpoints hardcoded in component',
      line: 54,
      solution: 'Move secrets to environment variables'
    },
    {
      id: 8,
      severity: 'Low',
      category: 'Performance',
      title: 'Missing Memoization',
      description: 'Component not optimized for re-renders',
      line: 10,
      solution: 'Use React.memo and useCallback for optimization'
    }
  ];

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Security': return '🛡️';
      case 'Performance': return '⚡';
      case 'Quality': return '📊';
      case 'Accessibility': return '♿';
      case 'Best Practices': return '✨';
      default: return '🔍';
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 text-center mb-4">
            🤖 CodeAnt AI Demo - Before & After
          </h1>
          <p className="lead text-center text-muted">
            Xem cách CodeAnt AI phát hiện và sửa chữa các vấn đề trong code
          </p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
        <Tab eventKey="comparison" title="📋 Issues Comparison">
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title>🔍 Detected Issues ({issues.length})</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Alert variant="info" className="mb-4">
                    <strong>CodeAnt AI Analysis Complete!</strong><br />
                    Phát hiện {issues.length} vấn đề trong component. Click vào từng issue để xem chi tiết.
                  </Alert>
                  
                  <Row>
                    {issues.map((issue) => (
                      <Col md={6} lg={4} key={issue.id} className="mb-3">
                        <Card className="h-100 issue-card">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Badge bg={getSeverityVariant(issue.severity)}>
                                {issue.severity}
                              </Badge>
                              <span className="fs-4">{getCategoryIcon(issue.category)}</span>
                            </div>
                            
                            <h6 className="card-title">{issue.title}</h6>
                            <p className="text-muted small mb-2">{issue.description}</p>
                            <p className="text-info small mb-2">
                              <strong>Line {issue.line}</strong>
                            </p>
                            
                            <Alert variant="success" className="small mb-0">
                              <strong>💡 Solution:</strong><br />
                              {issue.solution}
                            </Alert>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="before" title="❌ Before (Problematic)">
          <Row>
            <Col>
              <Card>
                <Card.Header className="bg-danger text-white">
                  <Card.Title>❌ Component có vấn đề (28 issues detected)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Alert variant="danger">
                    <strong>⚠️ Cảnh báo:</strong> Component này chứa nhiều lỗi bảo mật và hiệu suất nghiêm trọng!
                  </Alert>
                  
                  <div className="mb-3">
                    <Button 
                      variant="outline-danger" 
                      onClick={() => setShowProblematic(!showProblematic)}
                    >
                      {showProblematic ? 'Ẩn' : 'Hiển thị'} Component có vấn đề
                    </Button>
                  </div>

                  {showProblematic && (
                    <div className="border p-3 bg-light">
                      <Alert variant="warning">
                        <strong>Demo Only:</strong> Component này được tạo để demo, không chạy được thực tế
                      </Alert>
                      {/* Component hiển thị chỉ để demo, không thực sự render */}
                      <pre className="bg-white p-3 border rounded">
                        <code>{`// ProblematicComponent.jsx
// ❌ Missing PropTypes, XSS vulnerabilities, memory leaks
// ❌ API keys exposed, no input validation
// ❌ Direct DOM manipulation, performance issues`}</code>
                      </pre>
                    </div>
                  )}

                  <h5 className="mt-4 mb-3">🔍 Các vấn đề chính:</h5>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>🛡️ Security vulnerabilities</span>
                      <Badge bg="danger">3 High</Badge>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>⚡ Performance issues</span>
                      <Badge bg="warning">4 Medium</Badge>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>♿ Accessibility problems</span>
                      <Badge bg="info">5 Low</Badge>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>📊 Code quality issues</span>
                      <Badge bg="secondary">16 Total</Badge>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="after" title="✅ After (Fixed)">
          <Row>
            <Col>
              <Card>
                <Card.Header className="bg-success text-white">
                  <Card.Title>✅ Component đã được sửa chữa (0 issues)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Alert variant="success">
                    <strong>🎉 Hoàn hảo!</strong> Tất cả issues đã được sửa chữa theo đề xuất của CodeAnt AI!
                  </Alert>
                  
                  <div className="mb-3">
                    <Button 
                      variant="outline-success" 
                      onClick={() => setShowFixed(!showFixed)}
                    >
                      {showFixed ? 'Ẩn' : 'Hiển thị'} Component đã sửa
                    </Button>
                  </div>

                  {showFixed && (
                    <div className="border p-3 bg-light">
                      <FixedComponent 
                        userId="demo-user-123" 
                        onError={(msg) => console.log('Demo error:', msg)}
                      />
                    </div>
                  )}

                  <h5 className="mt-4 mb-3">✨ Các cải thiện đã thực hiện:</h5>
                  <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center">
                      <span className="me-2">🛡️</span>
                      <div>
                        <strong>Security:</strong> Added input sanitization, moved API keys to headers, prevented XSS
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                      <span className="me-2">⚡</span>
                      <div>
                        <strong>Performance:</strong> Added React.memo, useCallback, proper cleanup, reduced polling
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                      <span className="me-2">♿</span>
                      <div>
                        <strong>Accessibility:</strong> Added ARIA labels, semantic HTML, proper form structure
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                      <span className="me-2">📊</span>
                      <div>
                        <strong>Quality:</strong> Added PropTypes, error boundaries, proper state management
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="metrics" title="📊 Metrics Comparison">
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header className="bg-danger text-white">
                  <Card.Title>❌ Before Metrics</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Security Score</span>
                      <Badge bg="danger">3.2/10</Badge>
                    </div>
                  </div>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Quality Score</span>
                      <Badge bg="warning">4.1/10</Badge>
                    </div>
                  </div>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Performance Score</span>
                      <Badge bg="warning">5.8/10</Badge>
                    </div>
                  </div>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Accessibility Score</span>
                      <Badge bg="info">6.2/10</Badge>
                    </div>
                  </div>
                  <hr />
                  <div className="metric-item">
                    <div className="d-flex justify-content-between">
                      <strong>Overall Score</strong>
                      <Badge bg="danger">4.8/10</Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header className="bg-success text-white">
                  <Card.Title>✅ After Metrics</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Security Score</span>
                      <Badge bg="success">9.8/10</Badge>
                    </div>
                  </div>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Quality Score</span>
                      <Badge bg="success">9.5/10</Badge>
                    </div>
                  </div>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Performance Score</span>
                      <Badge bg="success">9.2/10</Badge>
                    </div>
                  </div>
                  <div className="metric-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Accessibility Score</span>
                      <Badge bg="success">9.7/10</Badge>
                    </div>
                  </div>
                  <hr />
                  <div className="metric-item">
                    <div className="d-flex justify-content-between">
                      <strong>Overall Score</strong>
                      <Badge bg="success">9.6/10</Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title>📈 Improvement Summary</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Alert variant="success">
                    <h5>🎯 CodeAnt AI Impact:</h5>
                    <ul className="mb-0">
                      <li><strong>Security:</strong> Cải thiện 206% (3.2 → 9.8)</li>
                      <li><strong>Quality:</strong> Cải thiện 132% (4.1 → 9.5)</li>
                      <li><strong>Performance:</strong> Cải thiện 59% (5.8 → 9.2)</li>
                      <li><strong>Accessibility:</strong> Cải thiện 56% (6.2 → 9.7)</li>
                      <li><strong>Overall:</strong> Cải thiện 100% (4.8 → 9.6)</li>
                    </ul>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <style jsx>{`
        .issue-card {
          transition: transform 0.2s;
        }
        .issue-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .metric-item {
          padding: 0.5rem 0;
        }
      `}</style>
    </Container>
  );
};

export default CodeAntDemoComparison;
