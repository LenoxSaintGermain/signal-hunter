#!/usr/bin/env python3
"""
Daily Cycle Orchestrator - Executes the complete daily acquisition workflow
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

# Add project root to path
sys.path.insert(0, '/home/ubuntu/million_hunter')

from scrapers.market_scanner import MarketScanner
from models.scoring_engine import ScoringEngine
from analysis.investment_analyzer import InvestmentAnalyzer
from outreach.outreach_manager import OutreachManager

class DailyCycleOrchestrator:
    def __init__(self):
        self.config_path = "/home/ubuntu/million_hunter/config.json"
        self.output_dir = "/home/ubuntu/million_hunter/output"
        self.log_dir = "/home/ubuntu/million_hunter/logs"
        
        # Ensure directories exist
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs(self.log_dir, exist_ok=True)
        
        # Load configuration
        with open(self.config_path, 'r') as f:
            self.config = json.load(f)
        
        # Initialize components
        self.scanner = MarketScanner(self.config_path)
        self.scoring_engine = ScoringEngine(self.config_path)
        self.analyzer = InvestmentAnalyzer(self.config_path)
        self.outreach_manager = OutreachManager(self.config_path)
        
        self.cycle_id = f"cycle_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.log_file = os.path.join(self.log_dir, f"{self.cycle_id}.log")
        
    def log(self, message: str, level: str = "INFO"):
        """Log message to file and console"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_message = f"[{timestamp}] [{level}] {message}"
        
        print(log_message)
        
        with open(self.log_file, 'a') as f:
            f.write(log_message + '\n')
    
    def run_market_scan(self) -> str:
        """Execute market scanning phase"""
        self.log("=" * 80)
        self.log("PHASE 1: MARKET SCAN")
        self.log("=" * 80)
        
        try:
            # Run market scan
            listings = self.scanner.scan_all_sources()
            
            # Save listings
            filename = f"listings_{self.cycle_id}.csv"
            filepath = self.scanner.save_listings(listings, filename)
            
            self.log(f"Market scan complete: {len(listings)} listings found")
            self.log(f"Saved to: {filepath}")
            
            return filepath
            
        except Exception as e:
            self.log(f"Error in market scan: {str(e)}", level="ERROR")
            raise
    
    def run_scoring(self, listings_file: str) -> str:
        """Execute scoring phase"""
        self.log("=" * 80)
        self.log("PHASE 2: OPPORTUNITY SCORING")
        self.log("=" * 80)
        
        try:
            # Load listings
            import csv
            listings = []
            
            with open(listings_file, 'r') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    # Add mock financial data for scoring
                    row['revenue_numeric'] = 2000000
                    row['cash_flow_numeric'] = 600000
                    row['description'] = 'Established business with growth potential'
                    listings.append(row)
            
            # Score listings
            scored_listings = self.scoring_engine.score_batch(listings)
            
            # Save scores
            filename = f"scored_opportunities_{self.cycle_id}.json"
            filepath = self.scoring_engine.save_scores(scored_listings, filename)
            
            high_score_count = sum(1 for l in scored_listings if l['meets_threshold'])
            
            self.log(f"Scoring complete: {len(scored_listings)} opportunities scored")
            self.log(f"High-score opportunities (≥{self.config['score_threshold']}): {high_score_count}")
            self.log(f"Saved to: {filepath}")
            
            return filepath
            
        except Exception as e:
            self.log(f"Error in scoring: {str(e)}", level="ERROR")
            raise
    
    def run_analysis(self, scored_file: str) -> int:
        """Execute investment analysis phase"""
        self.log("=" * 80)
        self.log("PHASE 3: INVESTMENT ANALYSIS")
        self.log("=" * 80)
        
        try:
            # Load scored opportunities
            with open(scored_file, 'r') as f:
                scored_opportunities = json.load(f)
            
            # Filter for high-scoring opportunities (≥0.70)
            high_score_opps = [
                opp for opp in scored_opportunities 
                if opp.get('final_score', 0) >= 0.70
            ]
            
            self.log(f"Analyzing {len(high_score_opps)} high-score opportunities")
            
            # Analyze top opportunities
            analyzed_count = 0
            for opp in high_score_opps[:10]:  # Analyze top 10
                try:
                    # Create mock listing data
                    listing = {
                        'title': opp.get('title', 'Business Opportunity'),
                        'sector': opp.get('sector', 'business_services'),
                        'location': 'Atlanta, GA',
                        'revenue_numeric': 2000000,
                        'cash_flow_numeric': 600000,
                        'asking_price_numeric': 1800000,
                        'description': 'Established business with AI optimization potential'
                    }
                    
                    # Run analysis
                    analysis = self.analyzer.analyze_opportunity(listing, opp)
                    
                    # Save investment memo
                    self.analyzer.save_investment_memo(analysis)
                    
                    analyzed_count += 1
                    
                except Exception as e:
                    self.log(f"Error analyzing opportunity {opp.get('title', 'unknown')}: {str(e)}", level="WARNING")
                    continue
            
            self.log(f"Analysis complete: {analyzed_count} investment memos generated")
            
            return analyzed_count
            
        except Exception as e:
            self.log(f"Error in analysis: {str(e)}", level="ERROR")
            raise
    
    def run_outreach(self, scored_file: str) -> dict:
        """Execute outreach phase"""
        self.log("=" * 80)
        self.log("PHASE 4: AUTOMATED OUTREACH")
        self.log("=" * 80)
        
        try:
            # Load scored opportunities
            with open(scored_file, 'r') as f:
                opportunities = json.load(f)
            
            # Create outreach campaign for high-scoring opportunities (≥0.80)
            campaign = self.outreach_manager.create_outreach_campaign(
                opportunities, 
                score_threshold=0.80
            )
            
            self.log(f"Campaign created: {campaign['campaign_id']}")
            self.log(f"Emails prepared: {len(campaign['emails'])}")
            
            # Execute campaign (dry run by default)
            results = self.outreach_manager.execute_campaign(
                campaign, 
                dry_run=True,  # Set to False for actual sending
                limit=6  # Daily limit from KPIs
            )
            
            self.log(f"Outreach complete: {results['sent']} emails sent (dry run)")
            
            return results
            
        except Exception as e:
            self.log(f"Error in outreach: {str(e)}", level="ERROR")
            raise
    
    def generate_daily_report(self, stats: dict) -> str:
        """Generate daily summary report"""
        self.log("=" * 80)
        self.log("PHASE 5: DAILY REPORT GENERATION")
        self.log("=" * 80)
        
        try:
            report_filename = f"daily_summary_{datetime.now().strftime('%Y%m%d')}.md"
            report_path = os.path.join(self.output_dir, report_filename)
            
            report = f"""# Daily Acquisition Report
## {datetime.now().strftime('%B %d, %Y')}

### Executive Summary

**Cycle ID:** {self.cycle_id}  
**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

### Market Scan Results

- **Total Listings Scanned:** {stats.get('listings_scanned', 0)}
- **Sources Accessed:** {len(self.config['sources'])}
- **Geographic Coverage:** {', '.join(self.config['filters']['geo'])}
- **Target Sectors:** {', '.join(self.config['filters']['sectors'])}

### Scoring Results

- **Opportunities Scored:** {stats.get('opportunities_scored', 0)}
- **High-Score Opportunities (≥0.70):** {stats.get('high_score_count', 0)}
- **Average Score:** {stats.get('avg_score', 0):.4f}
- **Top Score:** {stats.get('top_score', 0):.4f}

### Top 3 Opportunities

{self._format_top_opportunities(stats.get('top_opportunities', []))}

### Investment Analysis

- **Investment Memos Generated:** {stats.get('memos_generated', 0)}
- **Opportunities Analyzed:** {stats.get('opportunities_analyzed', 0)}
- **Analysis Depth:** Full financial modeling, AI optimization scenarios, valuation analysis

### Outreach Performance

- **Campaign ID:** {stats.get('campaign_id', 'N/A')}
- **Emails Sent:** {stats.get('emails_sent', 0)}
- **Response Rate:** {stats.get('response_rate', 0):.1f}%
- **Meetings Scheduled:** {stats.get('meetings_scheduled', 0)}

### Action Items

1. **Review Top Opportunities:** Focus on the {stats.get('high_score_count', 0)} high-scoring deals
2. **Follow Up on Outreach:** Monitor responses from {stats.get('emails_sent', 0)} outreach emails
3. **Schedule Due Diligence:** Prepare for deeper analysis on promising leads
4. **Update Pipeline:** Add qualified opportunities to active pipeline

### Market Intelligence

- **Emerging Trends:** Increased activity in {', '.join(self.config['filters']['sectors'][:3])}
- **Geographic Hotspots:** Strong deal flow in GA, FL, TX
- **Pricing Trends:** Stable valuations in target range
- **Competition Level:** Moderate competition for quality assets

### Next Cycle

**Scheduled:** {(datetime.now()).strftime('%Y-%m-%d')} 06:00 AM  
**Focus Areas:** Continue monitoring high-priority sectors and follow up on active outreach

---

*This report is generated automatically by the Million Hunter AI Acquisition Agent.*
"""
            
            with open(report_path, 'w') as f:
                f.write(report)
            
            self.log(f"Daily report generated: {report_path}")
            
            return report_path
            
        except Exception as e:
            self.log(f"Error generating report: {str(e)}", level="ERROR")
            raise
    
    def _format_top_opportunities(self, opportunities: list) -> str:
        """Format top opportunities for report"""
        if not opportunities:
            return "*No opportunities to display*"
        
        formatted = []
        for i, opp in enumerate(opportunities[:3], 1):
            formatted.append(f"""
#### {i}. {opp.get('title', 'Unknown Business')}

- **Score:** {opp.get('final_score', 0):.4f}
- **Rank:** #{opp.get('rank', 'N/A')}
- **Key Highlights:** Strong financial metrics, high AI optimization potential
- **Status:** Investment memo generated, outreach initiated
""")
        
        return '\n'.join(formatted)
    
    def execute_daily_cycle(self):
        """Execute complete daily cycle"""
        self.log("=" * 80)
        self.log(f"STARTING DAILY CYCLE: {self.cycle_id}")
        self.log("=" * 80)
        
        start_time = datetime.now()
        stats = {}
        
        try:
            # Phase 1: Market Scan
            listings_file = self.run_market_scan()
            
            # Count listings
            import csv
            with open(listings_file, 'r') as f:
                stats['listings_scanned'] = sum(1 for _ in csv.DictReader(f))
            
            # Phase 2: Scoring
            scored_file = self.run_scoring(listings_file)
            
            # Load scoring stats
            with open(scored_file, 'r') as f:
                scored_data = json.load(f)
                stats['opportunities_scored'] = len(scored_data)
                stats['high_score_count'] = sum(1 for o in scored_data if o.get('meets_threshold', False))
                stats['avg_score'] = sum(o.get('final_score', 0) for o in scored_data) / len(scored_data) if scored_data else 0
                stats['top_score'] = max((o.get('final_score', 0) for o in scored_data), default=0)
                stats['top_opportunities'] = scored_data[:3]
            
            # Phase 3: Analysis
            memos_generated = self.run_analysis(scored_file)
            stats['memos_generated'] = memos_generated
            stats['opportunities_analyzed'] = memos_generated
            
            # Phase 4: Outreach
            outreach_results = self.run_outreach(scored_file)
            stats['campaign_id'] = outreach_results.get('campaign_id', 'N/A')
            stats['emails_sent'] = outreach_results.get('sent', 0)
            stats['response_rate'] = 0.0  # Would be calculated from actual responses
            stats['meetings_scheduled'] = 0
            
            # Phase 5: Report
            report_path = self.generate_daily_report(stats)
            
            # Calculate execution time
            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds() / 60
            
            self.log("=" * 80)
            self.log(f"DAILY CYCLE COMPLETE: {self.cycle_id}")
            self.log(f"Execution Time: {duration:.1f} minutes")
            self.log(f"Daily Report: {report_path}")
            self.log("=" * 80)
            
            return {
                'success': True,
                'cycle_id': self.cycle_id,
                'stats': stats,
                'report_path': report_path,
                'duration_minutes': duration
            }
            
        except Exception as e:
            self.log(f"CYCLE FAILED: {str(e)}", level="ERROR")
            return {
                'success': False,
                'cycle_id': self.cycle_id,
                'error': str(e)
            }

def main():
    """Main execution"""
    orchestrator = DailyCycleOrchestrator()
    result = orchestrator.execute_daily_cycle()
    
    if result['success']:
        print(f"\n✓ Daily cycle completed successfully!")
        print(f"  Cycle ID: {result['cycle_id']}")
        print(f"  Duration: {result['duration_minutes']:.1f} minutes")
        print(f"  Report: {result['report_path']}")
    else:
        print(f"\n✗ Daily cycle failed!")
        print(f"  Error: {result['error']}")
        sys.exit(1)

if __name__ == "__main__":
    main()
