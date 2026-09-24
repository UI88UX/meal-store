import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col, Card, Button, Typography, Divider, Spin, Image } from 'antd';
import { ShoppingOutlined, StarFilled, ClockCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMeals } from '../slices/MealSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu } from '../slices/UiSlice';
import '../css/LandingPage.css';


const { Title, Text } = Typography;
const { Meta } = Card;

const heroImages = [
  {
    url: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg',
    title: 'Delicious Meals Delivered to Your Door',
    subtitle: 'Order from our premium menu with just a few clicks',
    buttonText: 'Order Now'
  },
  {
    url: 'https://img.freepik.com/free-photo/front-view-burger-stand_141793-15542.jpg',
    title: 'Fresh Ingredients, Perfect Taste',
    subtitle: 'Chef-prepared meals with love and care',
    buttonText: 'Explore Now'
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items: allMeals } = useSelector(state => state.meals);

  useEffect(() => {
    const loadFeaturedMeals = async () => {
      try {
        if (!allMeals || allMeals.length === 0) {
          dispatch(fetchMeals());
        }

        const shuffled = [...(allMeals || [])].sort(() => 0.5 - Math.random());
        setFeaturedMeals(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured meals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMeals();
  }, [dispatch, allMeals]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Hero Banner Carousel */}
      <Carousel autoplay effect="fade" style={{ width: '100%', height: '60vh', minHeight: '400px' }}>
        {heroImages.map((slide, index) => (
          <div key={index}>
            <div style={{
              position: 'relative',
              height: '60vh',
              minHeight: '400px',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textAlign: 'center',
              padding: '0 24px'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Title level={1} style={{ color: '#fff', fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: 16 }}>
                  {slide.title}
                </Title>
                <Text style={{ color: '#fff', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', display: 'block', marginBottom: 24 }}>
                  {slide.subtitle}
                </Text>
                <Link to='/product' onClick={() => dispatch(setActiveMenu('product'))}>
                  <Button type="primary" size="large" icon={<ShoppingOutlined />} style={{ borderRadius: 0 }}>
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Features Section */}
      <div style={{ padding: '48px 24px' }}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
              <ClockCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: 16 }} />
              <Title level={4} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>Fast Delivery</Title>
              <Text style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Get your food delivered in under 30 minutes</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
              <StarFilled style={{ fontSize: '48px', color: '#faad14', marginBottom: 16 }} />
              <Title level={4} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>Premium Quality</Title>
              <Text style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Only the freshest ingredients used</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
              <ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: 16 }} />
              <Title level={4} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>Easy Ordering</Title>
              <Text style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Simple online ordering process</Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Featured Meals */}
      <Divider>
        <Title level={2} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center' }}>
          Our Signature Dishes
        </Title>
      </Divider>

      <div style={{ padding: '0 24px 48px' }}>
        {featuredMeals.length > 0 ? (
          <Row gutter={[24, 24]} justify="center">
            {featuredMeals.map(meal => (
              <Col key={meal.idMeal} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={meal.strMealThumb || 'https://img.freepik.com/free-photo/flat-lay-table-full-delicious-food_23-2149141303.jpg'}
                      alt={meal.strMeal}
                      preview={false}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        aspectRatio: '1/1'
                      }}
                    />
                  }
                  actions={[
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => navigate('/product')}
                      style={{ borderRadius: 0 }}
                      block
                    >
                      Order Now
                    </Button>
                  ]}
                >
                  <Meta
                    title={<span style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>{meal.strMeal}</span>}
                    description={<span style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>{meal.strCategory}</span>}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                    <Text strong style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                      ${(meal.price || Math.floor(Math.random() * 50000) + 10000).toLocaleString()}
                    </Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <StarFilled style={{ color: '#faad14' }} />
                      <Text style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                        {(Math.random() * 0.5 + 4.5).toFixed(1)}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Text>Our menu is currently being prepared. Please check back soon!</Text>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div style={{
        textAlign: 'center',
        padding: '64px 24px',
        backgroundColor: '#f0f2f5'
      }}>
        <Title level={2} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 24 }}>
          Ready to experience delicious food?
        </Title>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/product')}
          style={{ borderRadius: 0 }}
        >
          Browse Full Menu
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;