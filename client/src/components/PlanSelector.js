import React, { useEffect, useState } from 'react';
import { PlanCellWrapper } from './PlanCellWrapper';

export function PlanSelector() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  const makePlanCellWrapperProps = (plan, cfg) => Object.assign(
    {}, 
    cfg, 
    {
      hovered: hoveredId === plan.id,
      selected: selectedId === plan.id,
      onMouseOver: () => setHoveredId(plan.id),
      onMouseOut: () => setHoveredId(null),
      onClick: () => setSelectedId(plan.id),
    }
  );

  const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(serverDomain + '/api/plan/list')
          .then((res) => res.json())
          .then((result) => result.data);
        
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPlans(false);
      }
    };
    
    fetchData();
  }, [serverDomain]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(serverDomain + '/api/plan/feature/list')
          .then((res) => res.json())
          .then((result) => result.data);
        
        setFeatures(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFeatures(false);
      }
    };
    
    fetchData();
  }, [serverDomain]);

  if (loadingPlans || loadingFeatures) {
    return (
      <div className="loading"></div>
    );
  }

  return (
    <div className="PlanSelector">
      <h3>Choose a plan</h3>
      <section>
        <header>
          <div className="col"></div>
          {plans.map((plan, idx) => (
            <PlanCellWrapper key={idx} 
              {...makePlanCellWrapperProps(plan)}
            >{plan.name}</PlanCellWrapper>
          ))}
        </header>
        {features.map((feature, idx) => (
          <div key={idx}>
            <div className="col">{feature.name}</div>
            {plans.map((plan, planIdx) => (
              <PlanCellWrapper key={idx} 
                {...makePlanCellWrapperProps(plan, {
                  classNames: [
                    plan.features.includes(feature.attrName) 
                    ? 'feature-included' 
                    : 'feature-notIncluded'
                  ]
                })}
              ></PlanCellWrapper>
            ))}
          </div>
        ))}
        <footer>
          <div className="col"></div>
          {plans.map((plan, idx) => (
            <PlanCellWrapper key={idx} 
              {...makePlanCellWrapperProps(plan)}
            >
              <input type="radio" 
                name="selectedPlan" 
                value={plan.id} 
                id={`selectedPlan_${plan.id}`}
                checked={selectedId === plan.id} 
              />
              <label for={`selectedPlan_${plan.id}`}>
                <span className="price">HK${plan.price}</span>
                <span className="duration">/Month</span>
              </label>
            </PlanCellWrapper>
          ))}
        </footer>
      </section>
    </div>
  );
}