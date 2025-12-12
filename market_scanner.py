#!/usr/bin/env python3
"""
Market Scanner - Aggregates business listings from multiple sources
"""

import json
import csv
import os
from datetime import datetime
from typing import List, Dict, Any
import requests
from bs4 import BeautifulSoup
import time

class MarketScanner:
    def __init__(self, config_path: str = "/home/ubuntu/million_hunter/config.json"):
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        self.sources = self.config['sources']
        self.filters = self.config['filters']
        self.output_dir = "/home/ubuntu/million_hunter/data"
        self.log_dir = "/home/ubuntu/million_hunter/logs"
        
    def scan_bizbuysell(self) -> List[Dict[str, Any]]:
        """Scan BizBuySell.com for business listings"""
        listings = []
        
        # BizBuySell search parameters based on filters
        base_url = "https://www.bizbuysell.com/businesses-for-sale/"
        
        # Map sectors to BizBuySell categories
        sector_mapping = {
            "waste_mgmt": "waste-management",
            "facilities": "facility-maintenance",
            "hvac": "hvac",
            "plumbing": "plumbing",
            "logistics": "logistics-transportation",
            "routes": "route-businesses",
            "home_services": "home-services"
        }
        
        for sector in self.filters['sectors']:
            category = sector_mapping.get(sector, sector)
            
            # Build search URL with filters
            params = {
                'q': category,
                'revenue_min': self.filters['revenue_min'],
                'revenue_max': self.filters['revenue_max'],
                'cash_flow_min': self.filters['cash_flow_min'],
                'cash_flow_max': self.filters['cash_flow_max']
            }
            
            # Note: Actual implementation would use Selenium/Playwright for dynamic content
            # This is a template structure
            listing = {
                'source': 'bizbuysell',
                'sector': sector,
                'url': f"{base_url}{category}",
                'scan_date': datetime.now().isoformat(),
                'status': 'template_placeholder'
            }
            listings.append(listing)
            
        return listings
    
    def scan_bizquest(self) -> List[Dict[str, Any]]:
        """Scan BizQuest.com for business listings"""
        listings = []
        
        # BizQuest implementation placeholder
        listing = {
            'source': 'bizquest',
            'url': 'https://www.bizquest.com',
            'scan_date': datetime.now().isoformat(),
            'status': 'template_placeholder'
        }
        listings.append(listing)
        
        return listings
    
    def scan_crexi(self) -> List[Dict[str, Any]]:
        """Scan Crexi.com for commercial real estate businesses"""
        listings = []
        
        # Crexi implementation placeholder
        listing = {
            'source': 'crexi',
            'url': 'https://www.crexi.com',
            'scan_date': datetime.now().isoformat(),
            'status': 'template_placeholder'
        }
        listings.append(listing)
        
        return listings
    
    def scan_loopnet(self) -> List[Dict[str, Any]]:
        """Scan LoopNet.com for commercial properties and businesses"""
        listings = []
        
        # LoopNet implementation placeholder
        listing = {
            'source': 'loopnet',
            'url': 'https://www.loopnet.com',
            'scan_date': datetime.now().isoformat(),
            'status': 'template_placeholder'
        }
        listings.append(listing)
        
        return listings
    
    def scan_sam_gov(self) -> List[Dict[str, Any]]:
        """Scan SAM.gov for government contract opportunities"""
        listings = []
        
        # SAM.gov API implementation placeholder
        listing = {
            'source': 'sam.gov',
            'url': 'https://sam.gov',
            'scan_date': datetime.now().isoformat(),
            'status': 'template_placeholder',
            'type': 'govt_contracts'
        }
        listings.append(listing)
        
        return listings
    
    def scan_all_sources(self) -> List[Dict[str, Any]]:
        """Execute scan across all configured sources"""
        all_listings = []
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting market scan...")
        
        # Scan each source
        scanners = {
            'bizbuysell.com': self.scan_bizbuysell,
            'bizquest.com': self.scan_bizquest,
            'crexi.com': self.scan_crexi,
            'loopnet.com': self.scan_loopnet,
            'sam.gov': self.scan_sam_gov
        }
        
        for source_name, scanner_func in scanners.items():
            if source_name in self.sources:
                try:
                    print(f"  Scanning {source_name}...")
                    listings = scanner_func()
                    all_listings.extend(listings)
                    print(f"  Found {len(listings)} listings from {source_name}")
                except Exception as e:
                    print(f"  Error scanning {source_name}: {str(e)}")
                    self.log_error(source_name, str(e))
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Scan complete. Total listings: {len(all_listings)}")
        
        return all_listings
    
    def save_listings(self, listings: List[Dict[str, Any]], filename: str = None):
        """Save listings to CSV file"""
        if not filename:
            filename = f"new_listings_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        
        filepath = os.path.join(self.output_dir, filename)
        
        if not listings:
            print("No listings to save")
            return
        
        # Get all unique keys from listings
        fieldnames = set()
        for listing in listings:
            fieldnames.update(listing.keys())
        fieldnames = sorted(list(fieldnames))
        
        with open(filepath, 'w', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(listings)
        
        print(f"Saved {len(listings)} listings to {filepath}")
        return filepath
    
    def log_error(self, source: str, error: str):
        """Log errors to file"""
        log_file = os.path.join(self.log_dir, f"scanner_errors_{datetime.now().strftime('%Y%m%d')}.log")
        
        with open(log_file, 'a') as f:
            f.write(f"[{datetime.now().isoformat()}] {source}: {error}\n")

def main():
    """Main execution function"""
    scanner = MarketScanner()
    listings = scanner.scan_all_sources()
    scanner.save_listings(listings)

if __name__ == "__main__":
    main()
